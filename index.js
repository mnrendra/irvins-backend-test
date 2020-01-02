// require app module
const app = require('./app')
// require db module
const { connectDB } = require('./db')
// require configuration
const { PORT, DB_URL, DB_OPT } = require('./config')

//
connectDB(DB_URL, DB_OPT)
  .then(({ connection, message }) => {
    // logging db message
    console.log(`${new Date()} : ${message}`)
    // start app
    app.listen(PORT, function () {
      // logging app message
      console.log(`${new Date()} : listen on port ${this.address().port}`)
    })
  })
  .catch(e => {
    // loggin error
    console.log(`${new Date()} : ${e.message}`)
  })
