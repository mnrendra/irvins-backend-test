// require node modules
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
// require local modules
const routes = require('./routes')
const { invalidJsonHandler } = require('./errors')

// init app
const app = express()

// middleware
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(invalidJsonHandler)
app.use(routes)

// export module
module.exports = app
