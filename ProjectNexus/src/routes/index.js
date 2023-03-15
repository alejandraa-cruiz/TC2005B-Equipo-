const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const router = express.Router();

const homeRoutes = require('./home.routes');
const loginRoutes = require('./login.routes');


module.exports.initRoutes = (app) => {
    app.use('/', loginRoutes);
    app.use('/dashboard', homeRoutes);
    app.use((req, res) => {
        res.sendStatus(404);
    })
}

// router.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
// });


