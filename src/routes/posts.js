const express = require('express');
const route = express.Router();

const postsController = require('../app/controllers/PostsController');

route.get('/:slug', postsController.show);

module.exports = route;
