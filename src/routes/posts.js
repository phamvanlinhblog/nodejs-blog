const express = require('express');
const router = express.Router();

const postsController = require('../app/controllers/PostsController');
const roleMiddleware = require('../app/middleware/RoleMiddleware');

router.get('/create', roleMiddleware, postsController.create);
router.get('/list', roleMiddleware, postsController.list);
router.post('/store', roleMiddleware, postsController.store);
router.get('/trash', roleMiddleware, postsController.trash);
router.get('/:id/update', roleMiddleware, postsController.update);
router.patch('/:id/restore', roleMiddleware, postsController.restore);
router.delete('/:id/force', roleMiddleware, postsController.forceDestroy);
router.post(
    '/handle-form-actions',
    roleMiddleware,
    postsController.handleFormActions,
);
router.put('/:id', roleMiddleware, postsController.putUpdate);
router.delete('/:id', roleMiddleware, postsController.destroy);
router.get('/:slug', postsController.show);

module.exports = router;
