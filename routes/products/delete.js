// require node modules
const { isValid } = require('mongoose').Types.ObjectId
// require local modules
const { Product } = require('../../models')
const { invalidId, notFoundId } = require('../../errors')

/**
 * deleteProductById function
 */
const deleteProductById = async ({ params }, res, next) => {
  // try code
  try {
    // validate id parameter
    const { id } = params
    if (!isValid(id)) {
      invalidId(res, id)
      return
    }

    // check existing first
    const doc = await Product.findOne({ _id: id })
    if (!doc) {
      notFoundId(res, id)
      return
    }

    // delete document
    Product.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          status: 200,
          success: {
            name: 'Success delete product!',
            data: {
              id,
              status: 'deleted'
            }
          }
        })
      }).catch(next)
  } catch (e) {
    next(e)
  }
}

// export module
module.exports = { deleteProductById }
