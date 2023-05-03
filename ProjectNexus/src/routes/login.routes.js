const express = require('express');
let router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/', authController.login);
router.get('/callback', authController.getCallback);
router.post('/callback', authController.postCallback, express.urlencoded({extended:false}));
// router.post('/checkState', authController.callbackState);

module.exports = router;