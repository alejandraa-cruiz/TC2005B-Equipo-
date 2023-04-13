const Project = require('../models/project.model');
const TeamMember = require('../models/teamMember.model');
const { emailValidation } = require('../utils/emailValidation');

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
            res.json({e: 'There is a member with the same email'});
        } else {
            res.json({e: 'Success!'});
        }
    }
    catch (e){
        if(e.code === 'ER_BAD_NULL_ERROR') {
            res.status(400).json({e: 'Entries can\'t be empty'});

        } else if (e.code === 'ECONNREFUSED') {
            res.status(500).json({e: 'Database failed'});

        } else if (e.code === 'ER_DATA_TOO_LONG') {
            res.status(400).json({e: 'You must select an area'});

        } else if (e instanceof TypeError) {
            res.status(400).json({e: 'Invalid email'});
        }
    }
    }