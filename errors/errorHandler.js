// require logger modules
// const logger = require('../logger')
// require invalidField
const invalidField = require('./invalidField')

/**
 * errorHandler function
 */
const errorHandler = ({ name, message, stack }, req, res, next) => {
  // MulterError handler
  if (message.includes('MulterError: ')) {
    invalidField(res, message.split('MulterError: ')[1])
    return
  } else if (name === 'MulterError') {
    let errorMessage
    switch (message) {
      case 'Unexpected field': errorMessage = 'Please input valid file field name'; break
      default: errorMessage = message
    }
    invalidField(res, errorMessage)
    return
  }

  // loging error into logs file
  console.log(`${new Date()} : ${stack}`)
  // send error message to client
  res.status(500).json({
    status: 500,
    error: {
      name,
      message
    }
  })
  // next
  next()
}

// export module
module.exports = errorHandler
