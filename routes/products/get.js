/**
 * getProducts function
 */
const getProducts = (req, res) => {
  res.status(200).json({
    status: 200,
    success: {
      name: 'Products',
      message: 'this is products endpoint'
    }
  })
}

/**
 * getProductsById function
 */
const getProductsById = (req, res) => {
  res.status(200).json({
    status: 200,
    success: {
      name: 'Products by Id',
      id: req.params.id
    }
  })
}

module.exports = { getProducts, getProductsById }
