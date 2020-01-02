// require Product model
const { Product } = require('../../models')
/**
 * postProduct function
 */
const postProduct = ({ body }, res) => {
  // destructuring fields from body
  const { name, price } = body
  // init new product
  const newProduct = new Product({
    name,
    price
  })
  // save new product
  newProduct.save()
    .then(({ _id, name, price, image }) => {
      //
      const data = {
        id: _id,
        name,
        price,
        image
      }
      //
      res.status(200).json({
        status: 200,
        success: {
          name: 'Success save new product!',
          data
        }
      })
    })
}

module.exports = { postProduct }
