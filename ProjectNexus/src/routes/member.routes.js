const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const createMemberController = require('../controllers/member.controller');


let router = express.Router();

router.get('/', requiresAuth(), createMemberController.createMember);


module.exports = router;