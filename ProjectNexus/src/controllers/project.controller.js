const Project = require('../models/project.model');

exports.project = async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
    // Render list of unassigned epics
    res.render(__dirname + '/../views/createProject', { user: userInfo });
}
exports.postProject = (req, res) => {
    const requestProject = req.body;
    // Keys {PART-232: "on"}
    Object.keys(requestProject);
    // List of strings: ["PART-232", "PART-233", "PART-234"]
    // requestProject[element] === "on"
    // ["PART-232", "PART-234"]
    // UPDATE EPIC TABLE AND SET TO 
    // WHERE Epic_link = list[i]
    console.log(requestProject.EPIC1);
    Project.fetch_name(requestProject.project_name)
        .then(([rows, fiedlData]) => {
            // If project not in database
            if (rows === 0) {
                const newProject = new project({
                    project_name: data.project_name,
                    start_date: data.start_date,
                    end_date: data.end_date
                });
                newProject.save()
                    // Check fieldData or rows
                    // and check where the index is and 
                    // check the project index
                    // insert into every epic
                    .then(([rows, fieldData]) => {
                        res.redirect('/dashboard');
                    })
                    .catch((error) => {console.log(error, fieldData)});
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
