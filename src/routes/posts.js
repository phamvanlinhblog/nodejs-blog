const express = require('express');
const router = express.Router();

const postsController = require('../app/controllers/PostsController');
const roleMiddleware = require('../app/middleware/RoleMiddleware');
const postsMiddleware = require('../app/middleware/PostsMiddleware');

router.get('/create', postsController.create);
router.get('/list', roleMiddleware, postsController.list);
router.post('/store', postsController.store);
router.get('/trash', postsController.trash);
router.get('/:id/update', postsMiddleware, postsController.update);
router.patch('/:id/restore', postsMiddleware, postsController.restore);
router.delete('/:id/force', postsMiddleware, postsController.forceDestroy);
router.post('/handle-form-actions', postsController.handleFormActions);
router.put('/:id', postsMiddleware, postsController.putUpdate);
router.delete('/:id', postsMiddleware, postsController.destroy);
router.get('/:slug', postsController.show);

module.exports = router;
