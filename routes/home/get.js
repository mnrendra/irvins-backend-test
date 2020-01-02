/**
 * getHome function
 */
const getHome = (req, res) => {
  res.status(200).json({
    status: 200,
    success: {
      name: 'Home',
      message: 'this is home'
    }
  })
}

module.exports = { getHome }
