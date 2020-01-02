// require router from express
const router = require('express').Router()
// require get function
const { getHome } = require('./get')

// routing midlleware
router.get('/', getHome)

// export module
module.exports = router
