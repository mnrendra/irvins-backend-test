// require Schema and model from mongoose
const { Schema, model } = require('mongoose')
// require model schema config
const { NAME, PRICE, IMAGE } = require('../config').SCHEMA.PRODUCT

// create new schema
const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: NAME.MIN_LENGTH,
    maxlength: NAME.MAX_LENGTH,
    match: NAME.MATCH,
    required: true
  },
  price: {
    type: Number,
    min: PRICE.MIN,
    max: PRICE.MAX,
    required: true
  },
  image: {
    type: String,
    trim: true,
    match: IMAGE.MATCH,
    default: null
  }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
})

// export module
module.exports = model('Product', ProductSchema)
