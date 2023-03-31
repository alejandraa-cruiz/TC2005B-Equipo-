exports.createProject = async (req, res) => {
    
    const userInfo = await req.oidc.fetchUserInfo();
    res.render(__dirname + '/../views/createProject', { user: userInfo });
   
}