// require local modules
const { Product } = require('../../models')
const { validateProduct } = require('../../joiSchemas')
const { requireField, invalidField, alreadyCreated } = require('../../errors')
// require config
const { URL } = require('../../config').UPLOAD_IMAGE

/**
 * postProduct function
 */
const postProduct = async ({ body, file }, res, next) => {
  // try code
  try {
    // validate requirement fields
    const { name, price } = body
    const image = file && `${URL}${file.filename}`
    if (!name || !price) {
      requireField(res, '"name" and "price"', 'fields are required!')
      return
    }

    // validate fields
    const { error, value } = await validateProduct({ name, price, image })
    if (error) {
      invalidField(res, error.details[0].message)
      return
    }

    // check existing first
    const doc = await Product.findOne({ name: value.name })
    if (doc) {
      alreadyCreated(res, 'product', value.name)
      return
    }

    // save new product
    const newProduct = new Product(value)
    newProduct.save()
      .then(({ _id, name, price, image, created, updated }) => {
        res.status(200).json({
          status: 200,
          success: {
            name: 'Success save new product!',
            data: {
              id: _id,
              name,
              price,
              image,
              created,
              updated
            }
          }
        })
      }).catch(next)
  } catch (e) {
    next(e)
  }
}

// export module
module.exports = { postProduct }
