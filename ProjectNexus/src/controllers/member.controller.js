const Project = require('../models/project.model');
const TeamMember = require('../models/teamMember.model');
const { emailValidation } = require('../utils/emailValidation');
const Epic = require("../models/epic.model");
const ProjectTeam = require('../models/project_team.model');

/** @type {import("express").RequestHandler} */
exports.memberList= async (req,res) => {
    const [projects] = await Project.fetch_all_id_name();
    try {
        const userInfo = await req.oidc.fetchUserInfo();
        res.render(__dirname+'/../views/memberList', { 
            user: userInfo, 
            projects: projects,
        })
    } catch(e) {
        console.log(e);
        res.redirect('/logout');
    }
    
}

/** @type {import("express").RequestHandler} */
exports.search = async (req,res) => {
    let teamMember;
    const member_name = req.query.name;
    if(member_name){
        [teamMember]=await TeamMember.search_by_name(member_name)
    }
    else{
        [teamMember]= await TeamMember.fetchAll();
    } 

    res.json({teamMembers:teamMember})
    return;
}

/** @type {import("express").RequestHandler} */
exports.createMember = async (req, res) => {
    const [projects] = await Project.fetch_all_id_name();
    try {
        const userInfo = await req.oidc.fetchUserInfo();
        res.render(__dirname + '/../views/createMember', { 
            user: userInfo, 
            projects: projects,
        })
    } catch(e) {
        console.log(e);
        res.redirect('/logout');
    }
    
}

/** @type {import("express").RequestHandler} */
exports.postMember= async (req, res) => {
    try{
        if(!emailValidation(req.body.email)){
            throw new TypeError('Invalid email');
        }
        let teamMember = new TeamMember(req.body);
        const [rows] = await teamMember.save();
        if(rows.affectedRows === 0) {
            res.json({
                msg: 'There is a member with the same email', 
                error: true
            });
        } else {
            res.json({e: 'Success!'});
        }
    }
    catch (e){
        if(e.code === 'ER_BAD_NULL_ERROR') {
            res.status(400).json({msg: 'Entries can\'t be empty',error: true});

        } else if (e.code === 'ECONNREFUSED') {
            res.status(500).json({msg: 'Database failed', error: true});

        } else if (e.code === 'ER_DATA_TOO_LONG') {
            res.status(400).json({msg: 'You must select an area', error: true});

        } else if (e instanceof TypeError) {
            res.status(400).json({msg: 'Invalid email', error: true});
        }
    }
}

/**
 * Fetch method Delete 
 * Delete member by id
 * @type {import("express").RequestHandler}
 */
exports.deleteMember = async (req, res) => {
    const [rows] = await TeamMember.delete_by_id (req.params.user);
    if (rows.affectedRows > 0){
        res.status(200).json({msg: 'Member was erased'});
    } else {
        res.status(500).json({msg: 'Database connection failed', error: true});
    }
}


exports.getModifyMember = async (req, res) =>{
    const [projects] = await Project.fetch_all_id_name();
    const [member] = await TeamMember.fetch_all_by_id(req.params.user);
    req.session.previousMember = member[0];
    try {
        const userInfo = await req.oidc.fetchUserInfo();
        res.render(__dirname + '/../views/modifyMember', {
            user: userInfo,
            projects: projects,
            name: member[0].member_name,
            email: member[0].email,
            team: member[0].team
        });
    } catch(e) {
        console.log(e);
    }
}

exports.postModifyMember = async (req, res) =>{
    try {
        if (!emailValidation(req.body.email)) {
            throw new TypeError('Invalid email');
        }
        else if (req.body.userName === ''){
            throw new SyntaxError('Name can´t be empty')
        }

        TeamMember.update_by_id(req.body.userName,req.body.email,req.body.team,req.params.user);
        res.json({error: false});
    } catch (e){
        if (e instanceof TypeError) {
            res.status(400).json({msg: 'Invalid email', error: true});
        } else if (e instanceof SyntaxError) {
            res.status(400).json({msg: 'Name can´t be empty', error: true});
        }

    }
}

/** @type {import("express").RequestHandler} */
exports.modifyPoints = async (req, res) => {
    try {
        const project = req.body.project;
        req.body.dataList.forEach(member => {
            const memberId = Object.keys(member)[0];
            const points = member[memberId];
            ProjectTeam.update(project, memberId, points);
        });
        res.json({ error: false });
    } catch {
        res.json({msg: 'database error', error: true });
    }
}
