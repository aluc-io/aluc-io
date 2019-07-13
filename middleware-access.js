import * as maxmind from 'maxmind'
import { createLogger } from './logger'

const logger = createLogger('access middleware')

const MMDB_PATH = process.env.ALUCIO_MMDB_PATH

const getSourceIp = (event) => {
  const queryStringParameters = event.queryStringParameters || {}
  // test IPs:
  // china: 52.80.41.169
  // ireland 52.18.242.156
  // seoul: 52.79.133.228
  let sourceIP = queryStringParameters.IP
  if (sourceIP) return sourceIP

  sourceIP = event.headers["x-forwarded-for"]
  if (sourceIP) return sourceIP

  sourceIP = event.requestContext.identity.sourceIp
  if (sourceIP) return sourceIP

  logger.warn('not found ip')
  return "127.0.0.1"
}

logger.info('openSync: ' + MMDB_PATH)
const lookup = maxmind.openSync(MMDB_PATH)

const accessMiddleware = (req, _, next) => {
  const strIPs = getSourceIp(req.apiGateway.event)
  const sourceIP = (strIPs.split(',')[0] || '').trim()
  const tracerouteIPs = strIPs.split(',').slice(1).join(',').trim()
  const { requestId } = req.apiGateway.event.requestContext

  const info = lookup.get(sourceIP)
  const locationArray = (info && info.location)
    ? `${info.location.longitude},${info.location.latitude}`
    : ''
  const cityName = (info && info.city) ? info.city.names.en : ''
  const continent = (info && info.continent) ? info.continent.code : ''
  const cca2 = (info && info.country) ? info.country.iso_code : ''
  const protocol = req.protocol
  req.accessInfo = { ...req.accessInfo, sourceIP, tracerouteIPs, continent, cca2, cityName, requestId, locationArray, protocol }
  next()
}

export default accessMiddleware
