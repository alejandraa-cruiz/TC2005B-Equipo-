const Project = require('../models/project.model');
const TeamMember = require('../models/teamMember.model');

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
        console.log(req.body);
        let teamMember = new TeamMember(req.body);
        await teamMember.save();
        res.json({e: 'Success!'})
    }
    catch{
        res.json({e: 'Database failed ):'})
    }
    }