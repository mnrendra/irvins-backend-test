/**
 * postProduct function
 */
const postProduct = ({ body }, res) => {
  // destructuring fields from body
  const { name, price } = body
  //
  res.status(200).json({
    status: 200,
    success: {
      name: 'Post product',
      data: {
        name,
        price
      }
    }
  })
}

module.exports = { postProduct }
