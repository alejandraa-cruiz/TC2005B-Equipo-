const Project = require("../models/project.model");
const charts = require("../utils/chartData");

/** @type {import("express").RequestHandler} */
exports.dashboard = async (req, res) => {
    const [projects] = await Project.fetch_all_id_name();
    const burnupChart = await charts.burnup(req.params.id);
    const estimateProgressChart = await charts.estimateProgress(req.params.id);
    const backendPoints = await charts.backendPoints(req.params.id);
    const frontendPoints = await charts.frontendPoints(req.params.id);
    const ticket_status = await charts.ticket_status(req.params.id);
    const teamWeeks = await charts.teamWeeks(req.params.id);
    try {
        const error = req.session.error || '';

        if(error != '') {
            req.session.error = '';
        }
        const userInfo = await req.oidc.fetchUserInfo();
        res.render(__dirname + '/../views/dashboard', { 
            user: userInfo,
            projects: projects,
            error: error,
            burnupChart: burnupChart,
            estimateProgressChart: estimateProgressChart,
            backendPoints: backendPoints,
            frontendPoints: frontendPoints,
            ticket_status: ticket_status,
            teamWeeks: teamWeeks,
         });
    } catch {
        res.redirect('/logout');
    }
}

/** @type {import("express").RequestHandler} */
exports.home = async (req, res) => {
    const [projects] = await Project.fetch_all_id_name();
    try {
        const error = req.session.error || '';

        if(error != '') {
            req.session.error = '';
        }

        const userInfo = await req.oidc.fetchUserInfo();
        
        res.render(__dirname + '/../views/home', { 
            user: userInfo,
            projects: projects,
            error: error,
         });
    } catch (err){
        console.log(err);
        res.redirect('/logout');
    }

}