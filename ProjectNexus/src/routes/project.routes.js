const express = require('express');
const { requiresAuth, claimEquals, claimCheck, claimIncludes } = require('express-openid-connect');
const ProjectController = require('../controllers/project.controller');

let router = express.Router();

router.get('/', requiresAuth(), ProjectController.project);
router.post('/create', requiresAuth(), ProjectController.postProject);
router.get('/list', requiresAuth(), ProjectController.getListProjects);
router.get('/list/:query', requiresAuth(), ProjectController.getListProjectsSearchBar);
router.delete('/delete/:project', requiresAuth(), ProjectController.deleteProject);

// router.post('/list', ProjectController.postListProjects);

module.exports = router;