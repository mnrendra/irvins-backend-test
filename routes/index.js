// require router from express
const router = require('express').Router()
// require routes modules
const home = require('./home')
const products = require('./products')
// require error handlers
const { errorHandler, notFoundEndpoint } = require('../errors')

// routing midlleware
router.use('/', home)
router.use('/products', products)
// error middleware
router.use('/*', notFoundEndpoint)
router.use(errorHandler)

// export module
module.exports = router
