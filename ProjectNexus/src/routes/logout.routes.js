const express = require('express');
const { auth } = require('express-openid-connect');

let router = express.Router();

router.use(auth({
    authRequired: false,
    idpLogout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
}));

module.exports = router;