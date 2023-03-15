exports.dashboard = async (req, res) => {

    try {
        const userInfo = await req.oidc.fetchUserInfo();
        res.render(__dirname + '/../views/home', { user: userInfo });
    } catch {
        res.redirect('/logout');
    }
}