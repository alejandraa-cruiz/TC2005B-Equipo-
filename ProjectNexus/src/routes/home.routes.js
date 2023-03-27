const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const homeController = require('../controllers/home.controller');
const uploadController = require('../controllers/upload.contoller');

let router = express.Router();

router.get('/', requiresAuth(), homeController.dashboard);
router.post('/upload', requiresAuth(), uploadController.file);

module.exports = router;