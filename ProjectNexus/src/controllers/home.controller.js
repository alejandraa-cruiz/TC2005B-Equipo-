const Project = require("../models/project.model");
const charts = require("../utils/chartData");

/** @type {import("express").RequestHandler} */
exports.dashboard = async (req, res) => {
    const [projects] = await Project.fetch_all_id_name();
    const burnupChart = await charts.burnup(req.params.id);
    const estimateProgressChart = await charts.estimateProgress(req.params.id);
    try {
        const error = req.session.error || '';

        if(error != '') {
            req.session.error = '';
        }

        const userInfo = await req.oidc.fetchUserInfo();
        
        console.log(burnupChart);
        console.log(estimateProgressChart);

        res.render(__dirname + '/../views/dashboard', { 
            user: userInfo,
            projects: projects,
            error: error,
            burnupChart: burnupChart,
            estimateProgressChart: estimateProgressChart
         });
    } catch {
        res.redirect('/logout');
    }
}

/** @type {import("express").RequestHandler} */
exports.home = async (req, res) => {
    res.redirect('/dashboard/1')
}