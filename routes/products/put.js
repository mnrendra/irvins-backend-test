// require node modules
const { isValid } = require('mongoose').Types.ObjectId
// require local modules
const { Product } = require('../../models')
const { validateProduct } = require('../../joiSchemas')
const { invalidId, requireField, invalidField, notFoundId, sameValue } = require('../../errors')
// require config
const { URL } = require('../../config').UPLOAD_IMAGE

/**
 * putProductById function
 */
const putProductById = async ({ params, body, file }, res, next) => {
  // try code
  try {
    // validate id parameter
    const { id } = params
    if (!isValid(id)) {
      invalidId(res, id)
      return
    }

    // validate requirement fields
    const { name, price } = body
    const image = file && `${URL}${file.filename}`
    if (!name && !price && !image) {
      requireField(res, '"name" or "price" or "image"', 'field is required!')
      return
    }

    // validate fields
    const fields = image ? { ...body, image } : body
    const { error, value } = await validateProduct(fields)
    if (error) {
      invalidField(res, error.details[0].message)
      return
    }

    // check existing first
    const doc = await Product.findOne({ _id: id })
    if (!doc) {
      notFoundId(res, id)
      return
    }

    // update product from new _product object
    Object.keys(value).map(key => {
      if (doc[key] === value[key]) {
        sameValue(res)
        return
      }
      doc[key] = value[key]
    })

    // save updated document to databse
    doc.save()
      .then(({ _id, name, price, image, created, updated }) => {
        res.status(200).json({
          status: 200,
          success: {
            name: 'Success update product!',
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
module.exports = { putProductById }
