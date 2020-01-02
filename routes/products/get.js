// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Product model
const { Product } = require('../../models')
// require errors module
const { invalidId, notFoundId } = require('../../errors')
// require GET_PRODUCT_QUERY config
const { MIN_PRICE, MAX_PRICE, LIMIT, PAGE } = require('../../config').QUERY
// require getSort from utils
const { getSort } = require('./utils')

/**
 * getProducts function
 */
const getProducts = async ({ query }, res, next) => {
  //
  try {
    //
    const { limit, page, minPrice, maxPrice, sortBy } = query
    //
    const queries = {}
    // set price queries with min and max price
    queries.price = {
      $gte: Number(minPrice) || MIN_PRICE,
      $lte: Number(maxPrice) || MAX_PRICE
    }
    // get sort
    const sort = getSort(sortBy)

    // find products based on filter queries
    const docs = await Product.find(queries, null, { sort })

    // get product number
    const total = docs.length

    // set limit per page and set page index for pagination
    const _limit = Number(limit) || LIMIT
    const _page = Number(page) || PAGE
    const startPage = _page * _limit
    const endPage = startPage + _limit

    // slice product array based on limit and page index for pagination
    const _docs = docs.slice(startPage, endPage)

    const data = _docs.map(({ _id, name, price, image, created, updated }) => {
      return {
        id: _id,
        name,
        price,
        image,
        created,
        updated
      }
    })
    //
    res.status(200).json({
      status: 200,
      total,
      page: _page,
      limit: _limit,
      data
    })
  } catch (e) {
    //
    next(e)
  }
}

/**
 * getProductsById function
 */
const getProductsById = async ({ params }, res, next) => {
  //
  try {
    // destructuring id paramter
    const { id } = params
    // return false if id invalid
    if (!isValid(id)) {
      invalidId(res, id)
      return
    }
    //
    const doc = await Product.findOne({ _id: id })
    // return false if product not found
    if (!doc) {
      notFoundId(res, id)
      return
    }
    //
    const { _id, name, price, image, created, updated } = doc
    //
    res.status(200).json({
      status: 200,
      data: {
        id: _id,
        name,
        price,
        image,
        created,
        updated
      }
    })
  } catch (e) {
    //
    next(e)
  }
}

module.exports = { getProducts, getProductsById }
