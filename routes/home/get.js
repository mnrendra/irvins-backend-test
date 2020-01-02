/**
 * getHome function
 */
const getHome = (req, res) => {
  res.status(200).json({
    status: 200,
    success: {
      name: 'Hello IRVINS',
      message: 'Please read this API docs in https://github.com/mnrendra/irvins-backend-test#readme'
    }
  })
}

// export modules
module.exports = { getHome }
