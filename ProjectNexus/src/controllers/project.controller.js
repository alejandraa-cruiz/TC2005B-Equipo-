const Project = require('../models/project.model');
const Epic = require('../models/epic.model');
const ProjectTeam = require('../models/project_team.model');
const User = require('../models/teamMember.model');

/** @type {import("express").RequestHandler} */
exports.project = async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
    const [projects] = await Project.fetch_all();
    try {
        const error = req.session.error || '';
        const projectError = req.session.projectError || '';

        if(error != '') {
            req.session.error = '';
        }
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
        .catch((error)=>{
            res.status(400).json({e: "You don't have assigned epics"})
        });
    } catch {
        res.redirect('/logout');
    }
    req.session.projectError = '';
}

exports.getEpicsProjects = (req, res) => {
    Epic.fetch_unassigned_epics()
    .then((rows, fieldData) => {
        const Epics = rows[0];
        if (Epics.length == 0){
            res.status(200).json({
                e: "You don't have assigned epics", Epics: Epics
            })
        }
        else {
            res.status(200).json({
                Epics: Epics, 
            })
        }
    })
}

/** @type {import("express").RequestHandler} */
exports.postProject = async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
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
        .then(([rows, fieldData]) => {
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
                        Project.update_epics(insertId, listEpicsToInsert)
                        // Insert into project_team_member
                        .then((rows, fieldData)=>{
                            // Fetch team member who has created the project
                            // before
                            User.fetch_id_by_email(userInfo.email)
                            .then((rows, fieldData) =>{
                                const [id_member] = rows[0];
                                // Fetch id of project by name
                                Project.fetch_id_by_name(newProject.project_name)
                                .then((rows, fieldData) =>{
                                    const [id_project] = rows[0];
                                    // Create instance of ProjectTeam model
                                    // (Every time a user creates a project
                                    // He's assigned to that project automatically
                                    const newProjectTeam = new ProjectTeam ({
                                        id_project : id_project.id_project,
                                        id_team_member : id_member.id_team_member,
                                        agile_points : 0,
                                    });
                                    newProjectTeam.save()
                                    .then(([rows, fieldData]) =>{
                                        res.status(200).json({e: 'Success'});
                                    })
                                    .catch((e)=>{res.status(500).json({e: 'Database conection failed'})});
                                })
                                .catch((e)=>{res.status(500).json({e: 'Database conection failed'})});
                                
                            })
                            .catch((e)=>{res.status(500).json({e: 'Database conection failed'})});
                            
                        })
                        .catch((e)=>{res.status(500).json({e: 'Database conection failed'})});
                    }
                    else{
                        console.log("Please verify your epics, there are no more left");
                    }
                })
                .catch((error) => {console.log(error)});
            } 
            // Prompt message of project already in database
            else {
                res.status(400).json({e: 'Project already exists'});
            }
        });
    } else {
        res.status(400).json({e: 'Invalid time range'});
        //res.redirect('/project');
    }
}

/** @type {import("express").RequestHandler} */
exports.getListProjects = async (req, res) => {
    // console.log("Token Claims: ", req.oidc.idTokenClaims);
    const userInfo = await req.oidc.fetchUserInfo();
    const [projects] = await ProjectTeam.fetch_all();

    const error = req.session.error || '';
    const projectError = req.session.projectError || '';
    const teamMemberError = req.session.teamMemberError || '';
    if (error != '' || projectError != '' || teamMemberError != '') {
        req.session.error = '';
        req.session.projectError = '';
        req.session.teamMemberError = '';
    }
    // Projects assigned by current user
    if(projects.length > 0){
        try{
            const teamMembers = await ProjectTeam.fetch_number_members_assigned(projects);
            projects.forEach((project, index) =>{
                projects[index].count_team_members = teamMembers[index];
            })
            res.render(__dirname + '/../views/projectsList', {
                user: userInfo,
                projects: projects,
                projectError: projectError,
            });
        } catch(error) {
            // No assigned members to project
        }
        // No projects assigned by current user
    } else{
        res.redirect('/project/');
    }
}

/** @type {import("express").RequestHandler} */
exports.getListProjectsSearchBar = async (req, res) => {
    const query = req.params.query;
    const userInfo = await req.oidc.fetchUserInfo();
    const [projects] = await ProjectTeam.fetch_projects_assigned_search_bar(query, userInfo.email);
    const error = req.session.error || '';
    const projectError = req.session.projectError || '';
    const teamMemberError = req.session.teamMemberError || '';
    if (error != '' || projectError != '' || teamMemberError != '') {
        req.session.error = '';
        req.session.projectError = '';
        req.session.teamMemberError = '';
    }
    // Projects assigned by current user
    if(projects.length > 0){
        try{
            res.status(200).json({
                user: userInfo,
                projects: projects,
                projectError: projectError,
            });
        } catch(error) {
            console.log(error)
            // No assigned members to project
        }
        // No projects assigned found on submit by current user
        // May want to create a project
    } else{
        res.status(500).json({message:'Internal Server Error'});
    }
}

/** @type {import("express").RequestHandler} */
exports.deleteProject = async (req, res) =>{
    Project.delete_by_name(req.params.project);
}

