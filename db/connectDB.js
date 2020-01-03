// require mongoose
const mongoose = require('mongoose')

/**
 * connectDB function
 */
const connectDB = (dbURL, dbOpt) => {
  // return new promise
  return new Promise((resolve, reject) => {
    // connect to db
    mongoose.connect(dbURL, dbOpt)
      .then(({ connection }) => {
        // create success message
        const { user, host, port, name } = connection
        const dbHost = user ? `${user}@${host}` : host
        const message = `db connected on ${dbHost}:${port}/${name}`
        // resolve with connection and a message
        resolve({ connection, message })
      }).catch(e => {
        reject(e)
      })
  })
}

// export module
module.exports = connectDB
