// require router from express
const router = require('express').Router()
// require get function
const { getProducts, getProductsById } = require('./get')

// routing midlleware
router.get('/', getProducts)
router.get('/:id', getProductsById)

// export module
module.exports = router
