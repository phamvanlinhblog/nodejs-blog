const express = require('express')
const route = express.Router()

const siteController = require('../app/controllers/SiteController')

route.use('/search', siteController.search)
route.get('/', siteController.home)
route.post('/', siteController.post)

module.exports = route
