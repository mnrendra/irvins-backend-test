// require router from express
const router = require('express').Router()
// require routes modules
const home = require('./home')
const products = require('./products')

// routing midlleware
router.use('/', home)
router.use('/products', products)

// export module
module.exports = router
