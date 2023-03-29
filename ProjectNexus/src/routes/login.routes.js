const express = require('express');
let router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/', authController.login);
router.get('/callback', authController.callback);
router.post('/callback', authController.callback);

module.exports = router;