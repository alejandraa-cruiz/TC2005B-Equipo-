const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const memberController = require('../controllers/member.controller');


let router = express.Router();

router.get('/',requiresAuth(),memberController.memberList)
router.get('/create', requiresAuth(), memberController.createMember);
router.post('/create', memberController.postMember);



module.exports = router;