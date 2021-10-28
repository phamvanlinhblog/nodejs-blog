const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
const usersMiddleware = require('../app/middleware/UsersMiddleware');
const authMiddleware = require('../app/middleware/AuthMiddleware');

router.get('/create', usersController.create);
router.post('/store', usersMiddleware, usersController.store);
router.get('/me', authMiddleware, usersController.me);
router.get('/', authMiddleware, usersController.index);

module.exports = router;
