const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/login', authController.login);
router.post('/login', authController.postLogin);

module.exports = router;
