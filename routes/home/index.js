// require router from express
const router = require('express').Router()
// require get function
const { getHome } = require('./get')
// require error module
const { notAllowedMethod } = require('../../errors')

// GET request
router.get('/', getHome)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
