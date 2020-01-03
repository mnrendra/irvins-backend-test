// require @hapi/joi module
const Joi = require('@hapi/joi')
// require config
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
const validateProduct = fields => {
  return new Promise((resolve, reject) => {
    try {
      const result = schema.validate(fields)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

// export module
module.exports = validateProduct
