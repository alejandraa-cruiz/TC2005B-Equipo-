const Project = require('../models/project.model');

exports.project = async (req, res) => {
    // We need to render every epic!!
    const userInfo = await req.oidc.fetchUserInfo();
    res.render(__dirname + '/../views/createProject', { user: userInfo });
}
exports.postProject = (req, res) => {
    const requestProject = req.body;
    console.log("YEEES");
    console.log(requestProject.EPIC1);
    Project.fetch_name(requestProject.project_name)
        .then(([rows, fiedlData]) => {
            // If project not in databasec
            if (rows === 0) {
                const newProject = new project({
                    project_name: data.project_name,
                    start_date: data.start_date,
                    end_date: data.end_date
                });
                newProject.save()
                    .then(([rows, fieldData]) => {
                        res.redirect('/dashboard');
                    })
                // Prompt message of project already in
                // database
            } 
            else {
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
