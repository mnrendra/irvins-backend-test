// require router from express
const router = require('express').Router()
// require route modules
const { getProducts, getProductsById } = require('./get')
const { postProduct } = require('./post')
// require error modules
const { notAllowedMethod } = require('../../errors')

// GET request
router.get('/', getProducts)
router.get('/:id', getProductsById)
// POST request
router.post('/', postProduct)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
