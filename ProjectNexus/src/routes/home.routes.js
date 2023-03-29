const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const homeController = require('../controllers/home.controller');
const uploadController = require('../controllers/upload.contoller');
const projectController = require('../controllers/project.controller');

let router = express.Router();

router.get('/', requiresAuth(), homeController.dashboard);
router.post('/upload', requiresAuth(), uploadController.file);
router.get('/createProject', requiresAuth(), projectController.postProject);

module.exports = router;