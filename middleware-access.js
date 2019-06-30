import * as maxmind from 'maxmind'

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

  console.error('not found ip')
  return "127.0.0.1"
}

console.log('openSync: ' + MMDB_PATH)
const lookup = maxmind.openSync(MMDB_PATH)
console.log('good')

const accessMiddleware = (req, _, next) => {
  const sourceIp = getSourceIp(req.apiGateway.event)
  const { requestId } = req.apiGateway.event.requestContext

  const info = lookup.get(sourceIp)
  const locationArray = (info && info.location)
    ? `${info.location.longitude},${info.location.latitude}`
    : ''
  const cityName = info ? info.city.names.en : ''
  const continent = info ? info.continent.code : ''

  const cca2 = info ? info.country.iso_code : ''
  req.accessInfo = { ...req.accessInfo, sourceIp, continent, cca2, cityName, requestId, locationArray }
  next()
}

export default accessMiddleware
