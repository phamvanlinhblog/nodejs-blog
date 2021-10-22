const express = require('express');
const route = express.Router();

const postsController = require('../app/controllers/PostsController');

route.get('/create', postsController.create);
route.get('/list', postsController.list);
route.post('/store', postsController.store);
route.get('/:id/update', postsController.update);
route.put('/:id', postsController.putUpdate);
route.delete('/:id', postsController.delete);
route.get('/:slug', postsController.show);

module.exports = route;
