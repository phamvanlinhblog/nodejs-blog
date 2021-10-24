const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.get('/create', usersController.create);
router.post('/store', usersController.store);
router.get('/', usersController.index);

module.exports = router;
