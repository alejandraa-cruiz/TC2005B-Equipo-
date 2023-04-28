// Authors: Karla Alejandra Padilla González A0170331 y Daniel Gutiérrez Gómez A01068056
// Date: 11/04/2023

const Project = require('../models/project.model');
const Epic = require('../models/epic.model');
const ProjectTeam = require('../models/project_team.model');
const User = require('../models/teamMember.model');
const TeamMember = require('../models/teamMember.model');

/** 
 * Render of create project view First, we fetch the userInfo
 * that is connected to Auth0 and our client's email, then
 * Fetch every project from database and render for our
 * client to input data to create a project
 * Only if there exist unassigned epics
 * @type {import("express").RequestHandler}
*/
exports.project = async (req, res) => {
    // Fetch userInfo with open id connect and Auth0
    const userInfo = await req.oidc.fetchUserInfo();
    // Fetch every project from out database to check for errors
    const [projects] = await Project.fetch_all();
    try {
        // Fetch every unassigned epic
        // then render user information, Epics and Projects
        Epic.fetch_unassigned_epics()
        .then((rows, fieldData) => {
            const Epics = rows[0];
            res.render(__dirname + '/../views/createProject', { 
                user: userInfo, 
                Epics: Epics, 
                projects: projects,
            });
        })
        // Render list of unassigned epics
        .catch((error)=>{
            res.status(400).json({msg: "You don't have assigned epics", error: true})
        });
    } catch {
        res.redirect('/logout');
    }
}
/** 
 * Fetch method `GET` for prompting error 
 * alert when there are no assigned epics
 * @type {import("express").RequestHandler}
*/
exports.getEpicsProjects = (req, res) => {
    Epic.fetch_unassigned_epics()
    .then((rows, fieldData) => {
        const Epics = rows[0];
        // If no more assigned epics
        if (Epics.length == 0){
            res.status(200).json({
                msg: "You don't have assigned epics", 
                Epics: Epics,
                error: false,
            })
        }
        // If there are epics
        else {
            res.status(200).json({
                Epics: Epics,
                error: false,
            })
        }
    })
}
/** 
 * Fetch method `POST`, to post new project
 * ONLY post in the next scenarios:
 * 1.- Start date is before the end date
 * 2.- Project name doesn't exist in database
 * 3.- If connection didn't failed
 * @type {import("express").RequestHandler}
*/
exports.postProject = async (req, res) => {
    // Fetch userInfo with open id connect and Auth0
    const userInfo = await req.oidc.fetchUserInfo();
    // GET the start date and end date
    const start_date = new Date(req.body.start_date).getTime();
    const end_date = new Date(req.body.end_date).getTime();
    // GET the requesting form data
    const requestProject = req.body;
    let insertId = 0;
    // Keys {PART-232: "on"}
    listEpicLinks = Object.keys(requestProject);
    const listEpicsToInsert = [];
    if(start_date < end_date) {
        // Fetch projects by name and check whether they exist or not
        Project.fetch_name(requestProject.project_name)
        .then(([rows, fieldData]) => {
            // If project not in database
            // Create new instance of project
            // with request data form
            if (rows.length === 0) {
                const newProject = new Project({
                    project_name: requestProject.project_name,
                    start_date: requestProject.start_date,
                    end_date: requestProject.end_date,
                });
                // Save the new project
                newProject.save()
                .then(([rows, fieldData]) => {
                    // Check rows where the last id was inserted
                    insertId = rows.insertId;
                    // If there are epics for assigning to the new project
                    if(listEpicLinks.length > 0){
                        // Push into list "listEpicsToInsert" every epic where the form was checked
                        listEpicLinks.forEach((epic, index) =>{
                            if (requestProject[epic] === "on") listEpicsToInsert.push(epic);
                        })
                        // Update every epic where epic link was checked and 
                        // with the project_id, for assigning every epic 
                        // to a project
                        Project.update_epics(insertId, listEpicsToInsert)
                        // Insert into project_team_member
                        .then((rows, fieldData)=>{
                            // Fetch team member who created the project
                            // to assign that project to him/her
                            User.fetch_id_by_email(userInfo.email)
                            .then((rows, fieldData) =>{
                                // Fetch user id 
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
                                    // Save new instance of ProjectTeam
                                    newProjectTeam.save()
                                    .then(([rows, fieldData]) =>{
                                        res.status(200).json({error: false });
                                    })
                                    .catch((e)=>{res.status(500).json({msg: 'Database conection failed', error: true})});
                                })
                                .catch((e)=>{res.status(500).json({msg: 'Database conection failed', error: true})});
                                
                            })
                            .catch((e)=>{res.status(500).json({msg: 'Database conection failed', error: true})});
                            
                        })
                        .catch((e)=>{res.status(500).json({msg: 'Database conection failed', error: true})});
                    }
                    else{
                        console.log("Please verify your epics, there are no more left");
                    }
                })
                .catch((error) => {console.log(error)});
            } 
            // Prompt message of project already in database
            else {
                res.status(400).json({msg: 'Project already exists', error: true });
            }
        });
    } else {
        res.status(400).json({msg: 'Invalid time range', error: true});
        //res.redirect('/project');
    }
}

/** 
 * Fetch method `POST`, to post new project
 * ONLY post in the next scenarios:
 * 1.- Start date is before the end date
 * 2.- Project name doesn't exist in database
 * 3.- If connection didn't failed
 * @type {import("express").RequestHandler}
*/
exports.getListProjects = async (req, res) => {
    // Fetch userInfo with open id connect and Auth0
    const userInfo = await req.oidc.fetchUserInfo();
    // Fetch every project
    const [projects] = await Project.fetch_all();

    // for(let project of projects){
    //     const [members] = await ProjectTeam.fetch_members(project.id_project);
    //     project.teamMembers = members;
    // }

    res.render(__dirname + '/../views/projectsList', {
        user: userInfo,
        projects: projects,
    });

    return;
}

/** 
 * Fetch method `GET`
 * @type {import("express").RequestHandler} 
*/
exports.getProjects = async (req, res) => {
    // Fetch every project
    const [projects] = await ProjectTeam.fetch_all();
    const [members] = await TeamMember.fetchAll();
    for(let i = 0; i < projects.length; i++){
        const project = projects[i];
        const [members] = await ProjectTeam.fetch_members(project.id_project);
        project.members = members; 
    }
    res.json({projects: projects, members: members});
}
/** 
 * Fetch method `GET`, get current index
 * based on the pagination and slice
 * projects depending on that req.param.index
 * @type {import("express").RequestHandler} 
*/
exports.getListProjectsPagination = async (req, res) => {
    // Fetch every project
    const [projects] = await ProjectTeam.fetch_all();
    // Projects assigned by current user
    const projectsPerPage = 4;
    const page = (parseInt(req.params.index) + 1);

    if(projects.length > 0){
        // Fetch the number of team members assigned to specific project
        // Promise.All() to get list of number of team members assigned
        const teamMembers = await ProjectTeam.fetch_number_members_assigned(projects);
        projects.forEach((project, index) =>{
            projects[index].count_team_members = teamMembers[index];
        })
        const totalPages = Math.ceil(projects.length / projectsPerPage);
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const sliceProjects = projects.slice(startIndex, endIndex);
        // Render project list with new key and value:
        // `{count_team_members: n}`
        res.json({
            sliceProjects: sliceProjects,
            totalPages: totalPages,
            startIndex: startIndex,
            endIndex: endIndex
        });
        // No projects assigned by current user
    } else{
        setTimeout(function () { res.redirect('/project') }, 3000);
    }
}

/** 
 * Fetch method `GET`, for searching just one project
 * at once, if no projects found, send "No projects"
 * were found and return to project list view
 * @type {import("express").RequestHandler}
*/exports.getListProjectsSearchBar = async (req, res) => {
    let Projects;
    // Fetch the project name
    let query = req.query.projectName;
    let startIndex = req.query.startIndex;
    let endIndex = req.query.endIndex;
    let flag = false;
    // Fetch only the projects were the logged in user
    // is assigned to
    // Projects assigned by current user
    if(query){
        [Projects] = await ProjectTeam.fetch_projects_assigned_search_bar(query);
        if(Projects.length === 0){
            [Projects] = await ProjectTeam.fetch_projects_unassinged_search_bar(query);
        }
        // No projects assigned found on submit by current user
        // May want to create a project
    } else{
        let [assigned] = await ProjectTeam.fetch_count_members_assigned();
        let [unassigned] = await ProjectTeam.fetch_unassigned_no_query();
        unassigned.forEach((project, index)=>{
            unassigned[index].count_team_members = 0;
        })
        let combined = [...assigned, ...unassigned];
        Projects = combined;
    } 
    if(flag){
        Projects.forEach((project, index)=>{
            Projects[index].count_team_members = 0;
        })
        flag = false;
    }
    const sliceProjects = Projects.slice(startIndex, endIndex);
    res.json({Projects: sliceProjects});
}

/** 
 * Fetch method DELETE
 * Delete project by id
 * @type {import("express").RequestHandler}
*/exports.deleteProject = async (req, res) =>{
    const [rows] = await Project.delete_by_id(req.params.project);
    if(rows.affectedRows > 0) res.status(200).json({msg:'project was erased', error: false});
    else res.status(500).json({ msg: 'Database conection failed', error: true});
}


/** @type {import("express").RequestHandler} */
exports.modifyProject = async (req,res) =>{
    const [projects] = await Project.fetch_all_id_name();
    try {
        const userInfo = await req.oidc.fetchUserInfo();
        const [name] = await Project.fetch_name_by_id(req.params.project);
        Epic.fetch_modify_epics(req.params.project)
            .then((rows, fieldData) => {
                const Epics = rows[0];
                res.render(__dirname + '/../views/modifyProject', {
                    user: userInfo,
                    Epics: Epics,
                    projects: projects,
                    id: req.params.project,
                    name: name[0].project_name,
                    start_date: name[0].start_date.toISOString().split('T')[0],
                    end_date: name[0].end_date.toISOString().split('T')[0]
                });
            })

    } catch(e) {
        console.log(e);
        res.redirect('/logout');
    }
}

/** @type {import("express").RequestHandler} */
exports.modifyProjectPost = async (req,res) =>{
    const start_date = new Date(req.body.start_date).getTime();
    const end_date = new Date(req.body.end_date).getTime();
    let insertId = 0;
    if(start_date < end_date) {
        Project.modify_by_id(req.body.project_name,req.body.start_date, req.body.end_date, req.params.project);
        Epic.set_null_by_id(req.params.project);

        delete req.body.project_name;
        delete req.body.start_date;
        delete req.body.end_date;
        const listEpicsToInsert= Object.keys(req.body);
        await Project.update_epics(req.params.project, listEpicsToInsert);
        res.json({error: false});

    } else {
        res.json({msg:'Invalid time range', error: true});
    }
}

exports.getMembersProject = async (req,res) =>{
    let project_id = req.params.project;
    const [members] = await User.fetch_unassigned(project_id);
    res.json({members: members});
}

/** @type {import("express").RequestHandler} */
exports.updateMembers = async (req, res) =>{
    const members = Object.keys(req.body);
    var id_project;
    var id_team_member;
    members.forEach((elem) => {
        id_project = req.params.project;
        id_team_member = elem;
    })
    const projectTeam = new ProjectTeam ({
        id_project : id_project,
        id_team_member : id_team_member,
        agile_points : 0
    });
    const [rows] = await projectTeam.save();
    if (rows.affectedRows > 0) res.status(200).json({ error: false });
    else res.status(500).json({ msg: 'Database conection failed', error: true });
}

exports.updateAgilePoints = async (req, res) =>{
    // console.log(members);
    const agile_points_dict = req.body;
    console.log(agile_points_dict);
    const agile_points = Object.keys(req.body);
    console.log(req.params.project);
    console.log(agile_points);
    agile_points.forEach((id,index) =>{
        console.log(agile_points_dict[index]);
        ProjectTeam.update_agile_points(agile_points_dict[index], id)
    })
    // if (rows.affectedRows > 0) res.status(200).json({ e: 'Success!' });
    // else res.status(500).json({ e: 'Database conection failed' });
}