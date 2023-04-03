const Project = require("../models/project.model");

/** @type {import("express").RequestHandler} */
exports.dashboard = async (req, res) => {
    const [projects] = await Project.fetch_all_id_name();
    try {
        const error = req.session.error || '';

        if(error != '') {
            req.session.error = '';
        }

        const userInfo = await req.oidc.fetchUserInfo();
        
        res.render(__dirname + '/../views/home', { 
            user: userInfo,
            projects: projects,
            error: error,
         });
    } catch {
        res.redirect('/logout');
    }
}