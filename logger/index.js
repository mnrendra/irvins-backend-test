// require winston
const winston = require('winston')
// destructuring from winston object
const { transports, format } = winston
const { File, Console } = transports
const { simple } = format

// create logger config
const logger = winston.createLogger({
  format: simple(),
  transports: [
    new File({ filename: './logs/error.log', level: 'error' }),
    new File({ filename: './logs/all.log' })
  ]
})

// set development option
switch (process.env.NODE_ENV) {
  case 'production': break
  default: logger.add(new Console({
    format: simple()
  }))
}

// set logger as global variable
module.exports = logger
