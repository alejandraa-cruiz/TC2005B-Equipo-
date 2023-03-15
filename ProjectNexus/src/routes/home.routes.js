const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const homeController = require('../controllers/home.controller');

let router = express.Router();

router.get('/', requiresAuth(), homeController.dashboard);

module.exports = router;