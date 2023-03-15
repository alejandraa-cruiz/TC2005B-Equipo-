const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const authController = require('../controllers/auth.controller');

let router = express.Router();

router.get('/', authController.login);

router.get('/callback', authController.callback);

router.post('/callback', authController.callback);

module.exports = router;
