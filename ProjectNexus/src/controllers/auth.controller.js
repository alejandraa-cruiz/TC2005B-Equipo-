exports.login = async (req, res) => {
    res.oidc.login({
        returnTo: '/dashboard',
        authorizationParams: {
            response_type: 'code id_token',
            redirect_uri: 'http://localhost:3000/callback',
            scope: 'openid profile email name picture middle_name'
        },
    });
}

exports.callback = (req, res) => {
    res.oidc.callback({
        redirectUri: 'http://localhost:3000/callback',
    });
}

