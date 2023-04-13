const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const createMemberController = require('../controllers/member.controller');


let router = express.Router();

router.get('/create', requiresAuth(), createMemberController.createMember);
router.post('/create', createMemberController.postMember);


module.exports = router;