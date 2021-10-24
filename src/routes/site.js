const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.use('/search', siteController.search);
router.get('/', siteController.home);
router.post('/', siteController.post);

module.exports = router;
