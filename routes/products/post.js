// require Product model
const { Product } = require('../../models')
// require joiSchema module
const { validateProduct } = require('../../joiSchemas')
// require error handler
const { invalidField } = require('../../errors')

/**
 * postProduct function
 */
const postProduct = async ({ body }, res, next) => {
  // try code
  try {
    // validate fields
    const { error, value } = await validateProduct(body)
    // return false if invalid field
    if (error) {
      const { message, context, path } = error.details[0]
      let errMsg
      if (context.regex) {
        switch (path[0]) {
          case 'name': errMsg = 'name must be alphanumeric and space is allowed'; break
          case 'image': errMsg = 'image must be valid image url'; break
        }
      } else errMsg = message
      invalidField(res, errMsg.replace(/"/g, ''))
      return
    }

    // init new product
    const newProduct = new Product(value)
    // save new product
    const { _id, name, price, image, created, updated } = await newProduct.save()
    // send success response
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
  } catch (e) {
    // next if catch an error
    next(e)
  }
}

// export module
module.exports = { postProduct }
