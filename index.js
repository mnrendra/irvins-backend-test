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
      // loggin app message
      console.log(`${new Date()} : listen on port ${this.address().port}`)
    })
  })
  .catch(e => {
    console.log(`${new Date()} : ${e.message}`)
  })
