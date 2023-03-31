/** @type {import("express").RequestHandler} */
exports.login = async (req, res) => {
    try {
        res.oidc.login({
            returnTo: '/user',
            authorizationParams: {
                response_type: 'code id_token',
                redirect_uri: 'http://localhost:3000/callback',
                scope: 'openid profile email name picture middle_name offline_access',
                promt: 'consent'
            },
        })
    } catch (error) {
        res.redirect('/login');
        // res.sendStatus(502);
    }
}
exports.onExecutePostLogin = async (event, api) => {
    api.access.deny("You can't log in");
};

/** @type {import("express").RequestHandler} */
exports.callback = (req, res) => {
    // let { token_type, access_token, isExpired, refresh } = req.oidc.accessToken;
    // if(isExpired()) {
    //     ({access_token} = await refresh());
    // }
    try{
        res.oidc.callback({
            redirectUri: 'http://localhost:3000/callback',
            tokenEndpointParams: 'id_token',
            prompt: 'consent',
            expires_at: '7200'
        });
    }
    catch (error){
        res.redirect('/login');
        // res.sendStatus(502);
    }
}