const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const usersController = require('../controllers/users.controller');

let router = express.Router();

router.get('/', requiresAuth(), usersController.getUser);
// POSIBLES RUTAS A AGREGAR
// router.post('/new', requiresAuth(), usersController.createUser);
// router.delete('/{userId}', requiresAuth(), usersController.deleteUser);
// router.patch('/{userId}', requiresAuth(), usersController.editUser);

module.exports = router;