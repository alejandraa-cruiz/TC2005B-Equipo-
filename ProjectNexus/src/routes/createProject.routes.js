const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const createProjectController = require('../controllers/createProject.controller');


let router = express.Router();

router.get('/createProject', requiresAuth(), createProjectController.createProject);


module.exports = router;