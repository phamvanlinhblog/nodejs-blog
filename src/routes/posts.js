const express = require('express');
const router = express.Router();

const postsController = require('../app/controllers/PostsController');

router.get('/create', postsController.create);
router.get('/list', postsController.list);
router.post('/store', postsController.store);
router.get('/trash', postsController.trash);
router.get('/:id/update', postsController.update);
router.patch('/:id/restore', postsController.restore);
router.delete('/:id/force', postsController.forceDestroy);
router.put('/:id', postsController.putUpdate);
router.delete('/:id', postsController.destroy);
router.get('/:slug', postsController.show);

module.exports = router;
