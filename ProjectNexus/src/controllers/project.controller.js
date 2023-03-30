const Project = require('../models/project.model');

/** @type {import("express").RequestHandler} */
exports.postProject = (req, res) => {
    const requestProject = req.body;
    Project.fetch_name(requestProject.project_name)
    .then(([rows, fiedlData]) =>{
        // If project not in database
        if(rows === 0){
            const newProject = new project ({
                project_name: data.project_name,
                start_date: data.start_date,
                end_date: data.end_date
            });
            newProject.save()
            .then(([rows, fieldData]) =>{
                res.redirect('/dashboard');
            })
            // Prompt message of project already in
            // database
        } else{
            // TODO: fetch userInfo and then send query with
            // username
            const userInfo = req.oidc.fetchUserInfo();
            let query = encodeURIcomponent(userInfo.name);
            res.redirect('/createProject?error=' + query);
        }
    })
    // Create view of not inputs inserted
    // .catch(error => {
    //     res.redirect('');
    // })
}
