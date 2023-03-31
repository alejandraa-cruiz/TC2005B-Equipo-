const Project = require('../models/project.model');
const Epic = require('../models/epic.model');

/** @type {import("express").RequestHandler} */
exports.project = async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
    // Fetch every unassigned epic
    Epic.fetch_unassigned_epics()
    .then((rows, fieldData) => {
        const Epics = rows[0];
        res.render(__dirname + '/../views/createProject', { user: userInfo, Epics: Epics });
    })
    // Render list of unassigned epics
    .catch((error)=>{console.log(error);});
}

/** @type {import("express").RequestHandler} */
exports.postProject = async (req, res) => {
    const requestProject = req.body;
    let insertId = 0;
    // Keys {PART-232: "on"}
    listEpicLinks = Object.keys(requestProject);
    const listEpicsToInsert = [];
    // List of strings: ["PART-232", "PART-233", "PART-234"]
    // requestProject[element] === "on"
    // ["PART-232", "PART-234"]
    // UPDATE EPIC TABLE AND SET TO
    // WHERE Epic_link = list[i]
    Project.fetch_name(requestProject.project_name)
        .then(([rows, fiedlData]) => {
            // If project not in database
            if (rows.length === 0) {
                const newProject = new Project({
                    project_name: requestProject.project_name,
                    start_date: requestProject.start_date,
                    end_date: requestProject.end_date,
                });
                newProject.save()
                // Check rows where the last id was inserted
                .then(([rows, fieldData]) => {
                    insertId = rows.insertId;
                    listEpicLinks.forEach((epic, index) =>{
                        if (requestProject[epic] === "on") listEpicsToInsert.push(epic);
                    })
                    Project.update_epics(insertId, listEpicsToInsert).then((res.redirect('/dashboard'))).catch((error)=>{console.log(error)});
                })
                .catch((error) => {console.log(error)});
            } 
            // Prompt message of project already in database
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
