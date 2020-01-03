// require app and db modules
const app = require('./app')
const { connectDB } = require('./db')
const logger = require('./logger')
// require configuration
const { PORT, DB_URL, DB_OPT } = require('./config')

// start connect db
connectDB(DB_URL, DB_OPT)
  .then(({ connection, message }) => {
    logger.info(`${new Date()} : ${message}`)
    // start app
    app.listen(PORT, function () {
      logger.info(`${new Date()} : listen on port ${this.address().port}`)
    })
  }).catch(({ stack }) => {
    logger.error(`${new Date()} : ${stack}`)
  })
