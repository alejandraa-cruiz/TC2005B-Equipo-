require('dotenv').config();

/** @type {import("express").RequestHandler} */
exports.login =  (req, res) => {
    try {
        res.oidc.login({
            returnTo : '/user',
            authorizationParams: {
                response_type: 'code id_token',
                redirect_uri: process.env.REDIRECT_URI || 'http://localhost:3000/callback',
                scope: 'openid profile email name picture middle_name',
                nonce: '',
                prompt: 'login',
            },
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
        // res.sendStatus(502);
    }
}

/** @type {import("express").RequestHandler} */
exports.postCallback = (req, res) =>{
    try{
        res.oidc.callback({
            redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/callback',
        });
    } catch(error){
        console.log(error);
        res.status(error.status || 500).end(error.message);
    }
}

/** @type {import("express").RequestHandler} */
exports.getCallback = (req, res) => {
    try{
        res.oidc.callback({
            redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/callback'
        });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).end(error.message);
    }
}

/** @type {import("express").RequestHandler} */
exports.callbackState = async (req, res) => {
    let { token_type, access_token, isExpired, refresh } = req.oidc.accessToken;
    if (isExpired()) {
        ({ access_token } = await refresh());
    } else{
        res.redirect('/');
    }
}