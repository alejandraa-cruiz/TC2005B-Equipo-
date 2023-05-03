const express = require('express');
const { requiresAuth, claimEquals, claimCheck, claimIncludes } = require('express-openid-connect');
const ProjectController = require('../controllers/project.controller');

let router = express.Router();

router.get('/epics',requiresAuth(), ProjectController.getEpicsProjects);
router.post('/create', requiresAuth(), ProjectController.postProject);
router.get('/list/members/:project', requiresAuth(), ProjectController.getMembersProject);
router.get('/list/search', requiresAuth(), ProjectController.getListProjectsSearchBar);
router.get('/list/pagination/:index', requiresAuth(), ProjectController.getListProjectsPagination);
router.get('/list', requiresAuth(), ProjectController.getListProjects);
router.get('/all', requiresAuth(), ProjectController.getProjects);
router.delete('/delete/:project', requiresAuth(), ProjectController.deleteProject);
router.get('/modify/:project',requiresAuth(),ProjectController.modifyProject);
router.post('/modify/:project',requiresAuth(),ProjectController.modifyProjectPost);
router.patch('/update/:project',requiresAuth(),ProjectController.updateMembers);
router.get('/', requiresAuth(), ProjectController.project);

module.exports = router;