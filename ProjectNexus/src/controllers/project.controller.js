const Project = require('../models/project.model');
const Epic = require('../models/epic.model');

/** @type {import("express").RequestHandler} */
exports.project = async (req, res) => {
    const [projects] = await Project.fetch_all_id_name();
    try {
        const error = req.session.error || '';
        const projectError = req.session.projectError || '';

        if(error != '') {
            req.session.error = '';
        }
        const userInfo = await req.oidc.fetchUserInfo();
        // Fetch every unassigned epic
        Epic.fetch_unassigned_epics()
        .then((rows, fieldData) => {
            const Epics = rows[0];
            res.render(__dirname + '/../views/createProject', { 
                user: userInfo, 
                Epics: Epics, 
                projects: projects,
                error: error,
                projectError: projectError
            });
        })
        // Render list of unassigned epics
        .catch((error)=>{console.log(error);});
    } catch {
        res.redirect('/logout');
    }
    req.session.projectError = '';
}

/** @type {import("express").RequestHandler} */
exports.postProject = async (req, res) => {
    console.log(req.body);
    const start_date = new Date(req.body.start_date).getTime();
    const end_date = new Date(req.body.end_date).getTime();
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
    if(start_date < end_date) {
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
                    if(listEpicLinks.length > 0){
                        listEpicLinks.forEach((epic, index) =>{
                            if (requestProject[epic] === "on") listEpicsToInsert.push(epic);
                        })
                        Project.update_epics(insertId, listEpicsToInsert).then((res.redirect('/dashboard'))).catch((error)=>{console.log(error)});
                    }
                    else{
                        console.log("Please verify your epics, there are no more left");
                    }
                })
                .catch((error) => {console.log(error)});
            } 
            // Prompt message of project already in database
            else {
                req.session.projectError = 'Project already exists';
                res.redirect('/createProject');
            }
        });
    } else {
        req.session.projectError = 'Invalid time range';
        res.redirect('/createProject');
    }
}