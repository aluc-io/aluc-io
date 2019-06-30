import morgan from 'morgan'
import { createServer, proxy } from  'aws-serverless-express'
import { eventContext } from  'aws-serverless-express/middleware'
import { app } from './app'

const binaryMimeTypes = []
const server = createServer(app, null, binaryMimeTypes)
export const index = (event, context) => {
  console.log('index')
  morgan.token('request-id', () => context.awsRequestId)
  return proxy(server, event, context)
}
