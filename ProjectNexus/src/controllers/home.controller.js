/** @type {import("express").RequestHandler} */
exports.dashboard = async (req, res) => {
    try {
        const error = req.session.error || '';

        if(error != '') {
            req.session.error = '';
        }

        const userInfo = await req.oidc.fetchUserInfo();

        res.render(__dirname + '/../views/home', { 
            user: userInfo,
            error: error,
         });
    } catch {
        res.redirect('/logout');
    }
}