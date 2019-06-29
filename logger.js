const EnumLogLevel = {
  error:0,
  warn:1,
  info:2,
  verbose:3,
  debug:4,
  silly:5,
}
let level = EnumLogLevel.debug

export const setLevel = (l) => { level = l }

// AWS Lambda nodejs 10.x runtime 으로 업데이트 할때 주의사항:
// 10.x 에서는 DEBUG, INFO, WARN, ERROR 와 같은 log level 을 자동으로 붙여주는 것 같음.
export const createLogger = (type='-') => {
  const logger = {
    debug: (msg: string | Object) => {
      if (level < EnumLogLevel.debug) return

      msg = typeof msg === 'object' ? JSON.stringify(msg) : msg
      // console.debug 는 time, request-id 를 남기지 않아서 `log()` 사용
      console.log(`DEBUG [${type}] ${msg}`)
    },
    info: (msg: string | Object) => {
      if (level < EnumLogLevel.info) return

      msg = typeof msg === 'object' ? JSON.stringify(msg) : msg
      console.info(`INFO [${type}] ${msg}`)
    },
    warn: (msg: string | Object) => {
      if (level < EnumLogLevel.warn) return

      msg = typeof msg === 'object' ? JSON.stringify(msg) : msg
      console.warn(`WARN [${type}] ${msg}`)
    },
    error: (msg: string | Object) => {
      if (level < EnumLogLevel.error) return

      msg = typeof msg === 'object' ? JSON.stringify(msg) : msg
      console.error(`ERROR [${type}] ${msg}`)
    },
  }
  return logger
}

export const logError = (msg) => {
  const { errorNo, message, description } = msg
  console.error(`ERROR [ERROR] ${errorNo} "${message}" "${description || '-'}"` + message)
}
