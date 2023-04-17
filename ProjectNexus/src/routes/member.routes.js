const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const memberController = require('../controllers/member.controller');


let router = express.Router();

router.get('/',requiresAuth(),memberController.memberList)
router.get('/create', requiresAuth(), memberController.createMember);
router.get('/search', requiresAuth(), memberController.search);
router.post('/create', requiresAuth(), memberController.postMember);
router.get('/modify/:user', memberController.getModifyMember);
router.post('/modify/:user', requiresAuth(), memberController.postModifyMember);




module.exports = router;