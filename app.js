import { join, basename } from 'path'
import { includes } from 'lodash'
import express from 'express'
import * as AWS from 'aws-sdk'
import morgan from 'morgan'
import mime from 'mime-types'
import slash from 'slash'
import { eventContext } from  'aws-serverless-express/middleware'
import accessMiddleware from './middleware-access'
import { createLogger } from './logger'

const logger = createLogger('app')

const { ALUCIO_S3BUCKET_NAME, S3PREFIX, GIT_REVISION } = process.env

const s3 = new AWS.S3()
export const app = express()

app.use(eventContext())
app.use(accessMiddleware)

// ALB backend 로 lambda 가 사용될 땐 req.apiGateway.event.requestContext 에서
// request-id 를 가져오지 못하므로 handler 에서 Context 에 접근하여 request-id 를 셋팅해줌.
// morgan.token('request-id', (req: IRequest) => req.accessInfo.requestId)
morgan.token('source-ip',      (req) => req.accessInfo.sourceIp)
morgan.token('host',           (req) => req.hostname)
morgan.token('location-array', (req) => req.accessInfo.locationArray)
morgan.token('continent',      (req) => req.accessInfo.continent)
morgan.token('cca2',           (req) => req.accessInfo.cca2)
morgan.token('city-name',      (req) => req.accessInfo.cityName)
morgan.token('revision',          () => GIT_REVISION)
app.use(morgan(':date[iso] :request-id INFO [ACCESS] ":revision" :source-ip :continent :cca2 ":city-name" [:location-array] :host ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'))

app.use('/version.json', (req, res) => {
  res.json({ GIT_REVISION, S3PREFIX })
})

app.use('/', (req, res) => {
  const slideArr = ['docker-devops','slack-tip-convention'].map(t => `/slide/${t}`)
  if (includes(slideArr, req.path)) return res.redirect(`${req.path}/`)

  const s3Path =
        /^\/\d\d\d\d-\d\d-\d\d-/.test(req.path)     ? join(req.path, 'index.html') // posts
      : req.path === '/slide/docker-devops/'        ? join(req.path, 'index.html')
      : req.path === '/slide/slack-tip-convention/' ? join(req.path, 'index.html')
      : /^\/search/.test(req.path)                  ? join(req.path, 'index.html')
      : /^\/about-me/.test(req.path)                ? join(req.path, 'index.html')
      : /^\/qr/.test(req.path)                      ? join('/about-me', 'index.html')
      : /^\/favicon\.ico/.test(req.path)            ? join('favicon','favicon.ico')
      : /^\/favicon\//.test(req.path)               ? join(req.path)
      : req.path === '/'                            ? 'index.html'
      : req.path

  logger.debug('s3Path:' + s3Path)
  const params = { Bucket: ALUCIO_S3BUCKET_NAME, Key: slash(join(S3PREFIX, s3Path)) }

  const contentType = mime.contentType(basename(s3Path))
  logger.debug('contentType:' + contentType)
  const type = contentType.split('/')[0]
  if (type === 'image' || type === 'font') {
    return res.redirect(s3.getSignedUrl('getObject', params))
  }

  logger.debug('params:' + JSON.stringify(params))
  s3.getObject(params, (err, data) => {
    if (err) return res.status(404).send(`PAGE NOT FOUND: ${params.Key}`)

    res.set('content-type', contentType)
    res.send(data.Body.toString('utf-8'))
  })
})

console.log('app.js was loaded')
logger.info('app.js was loaded')
