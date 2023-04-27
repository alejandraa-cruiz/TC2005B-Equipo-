const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const memberController = require('../controllers/member.controller');


let router = express.Router();

router.get('/',requiresAuth(),memberController.memberList)
router.get('/create', requiresAuth(), memberController.createMember);
router.get('/search', requiresAuth(), memberController.search);
router.post('/create', requiresAuth(), memberController.postMember);
router.delete('/delete/:user', requiresAuth(),memberController.deleteMember);
router.get('/modify/:user', requiresAuth(), memberController.getModifyMember);
router.post('/modify/:user', requiresAuth(), memberController.postModifyMember);
router.patch('/points', requiresAuth(), memberController.modifyPoints)





module.exports = router;