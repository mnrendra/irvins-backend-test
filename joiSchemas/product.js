// require @hapi/joi module
const Joi = require('@hapi/joi')
// require model schema config
const { NAME, PRICE, IMAGE } = require('../config').SCHEMA.PRODUCT

// create product shema
const schema = Joi.object({
  name: Joi.string()
    .regex(NAME.MATCH)
    .min(NAME.MIN_LENGTH)
    .max(NAME.MAX_LENGTH),
  price: Joi.number()
    .min(PRICE.MIN)
    .max(PRICE.MAX),
  image: Joi.string()
    .regex(IMAGE.MATCH)
})

/**
 * validateProduct function
 */
const validateProduct = (fields, optMethod, optValue) => {
  return new Promise((resolve, reject) => {
    try {
      // const result = schema[optMethod](...optValue).validate(fields)
      const result = schema.validate(fields)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

// export module
module.exports = validateProduct
