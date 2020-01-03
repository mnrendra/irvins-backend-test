// require router from express
const router = require('express').Router()
// require route modules
const { getProducts, getProductsById } = require('./get')
const { postProduct } = require('./post')
const { putProductById } = require('./put')
const { deleteProductById } = require('./delete')
// require middleware from local utils
const { uploadImage } = require('./utils')
// require error modules
const { notAllowedMethod, requireId } = require('../../errors')

// GET request
router.get('/', getProducts)
router.get('/:id', getProductsById)
// POST request
router.post('/', uploadImage(), postProduct)
// PUT request
router.put('/', requireId)
router.put('/:id', uploadImage(), putProductById)
// DELETE request
router.delete('/', requireId)
router.delete('/:id', deleteProductById)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
