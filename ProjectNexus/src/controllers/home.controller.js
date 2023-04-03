const Project = require("../models/project.model");

/** @type {import("express").RequestHandler} */
exports.dashboard = async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
    const [projects] = await Project.fetch_projects_assigned(userInfo.email);
    try {
        const error = req.session.error || '';

        if(error != '') {
            req.session.error = '';
        }

        res.render(__dirname + '/../views/home', { 
            user: userInfo,
            projects: projects,
            error: error,
         });
    } catch {
        res.redirect('/logout');
    }
}