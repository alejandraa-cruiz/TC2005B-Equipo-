require('dotenv').config();
const Project = require("../models/project.model");
const Ticket = require("../models/ticket.model");
const Epic = require("../models/epic.model");

// Add (sum) days to date - prototype
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

class BurnupChart {
    constructor(scope, points_done, goal_points, weeks) {
        this.scope = scope;
        this.points_done = points_done;
        this.goal_points = goal_points;
        this.weeks = weeks;
    }
}

exports.burnup = async (project_id) => {
    // Calculate the number of weeks between the start and end date of a project 
    const [date_rows] = await Project.fetch_dates(project_id);
    const difference = date_rows[0].end_date.getTime() - date_rows[0].start_date.getTime();
    const total_days = Math.ceil(difference / (1000 * 3600 * 24));
    const weeks = Math.ceil(total_days / 7);

    // Initial values 
    let week_start = date_rows[0].start_date;  
    let week_end = week_start.addDays(6); 
    let points_done = []; 
    let goal_points = []; 
    let scope = [];
    const [scope_rows] =  await Ticket.fetch_scope(project_id, week_start, date_rows[0].week_start);
    const scope_points = scope_rows[0].scope;
    const weekly_points = scope_points / weeks; 
    let goal_points_cont = 0;
    let done_aux = 0;
    let week_aux = 1;
    let week_list = [];

    for (let i = 0; i < weeks; i++) {
        const [done_rows] = await Ticket.fetch_done_week(project_id, week_start, week_end);
        const points_aux = done_rows[0].points_done;
        if (points_aux){
            done_aux += points_aux;
        }
        points_done.push(done_aux);
        week_start = week_end.addDays(1);
        week_end = week_start.addDays(6);

        goal_points_cont += weekly_points;
        goal_points.push(goal_points_cont);

        scope.push(scope_points);

        week_list.push(week_aux);
        week_aux += 1;
    }

    return new BurnupChart(scope, points_done, goal_points, week_list);
}

class EstimateProgressChart {
    constructor(epics, progress, estimate) {
        this.epics = epics;
        this.progress = progress;
        this.estimate = estimate;
    }
}

exports.estimateProgress = async (project_id) => {
    const [epics_rows] = await Epic.fetch_epic_link(project_id);
    let epics = epics_rows.flat();
    epics = epics.map(item => item.epic_link);

    let progress = [];
    let estimate = [];
    for (const epic of epics) {
        const [progress_rows] = await Ticket.fetch_done(epic);
        progress.push(progress_rows[0].tickets_done);
        const [estimate_rows] = await Ticket.fetch_not_done(epic);
        estimate.push(estimate_rows[0].tickets_pending);
    }



    return new EstimateProgressChart(epics, progress, estimate);
}

class ticket_status{
    constructor(done, to_do, code_review, in_progress, canceled){
        this.done=done;
        this.to_do=to_do;
        this.code_review=code_review;
        this.in_progress=in_progress;
        this.canceled=canceled;
    }
}

exports.ticket_status = async (project_id) => {
    const [done] = await Ticket.tickets_done(project_id);
    const [to_do] = await Ticket.tickets_to_do(project_id);
    const [code_review] = await Ticket.tickets_code_review(project_id);
    const [in_progress] = await Ticket.tickets_in_progress(project_id);
    const [canceled] = await Ticket.tickets_canceled(project_id)
    
    return new ticket_status(done[0].tickets_done,to_do[0].tickets_done,code_review[0].tickets_code_review,in_progress[0].tickets_in_progress,canceled[0].tickets_canceled)
}
class backendPoints {
    constructor(epics, tickets_done_be_by_epic) {
        this.epics = epics;
        this.tickets_done_be_by_epic = tickets_done_be_by_epic;
    }
}
exports.backendPoints = async (project_id) => {
    const [epics_rows] = await Epic.fetch_epic_link(project_id);
    let epics = epics_rows.flat();
    epics = epics.map(item => item.epic_link);

    let tickets_done_be_by_epic = []

    for (const epic of epics) {
        const [done_be_by_epic] = await Ticket.tickets_done_be_by_epic(epic);
        tickets_done_be_by_epic.push(done_be_by_epic[0].tickets_done_be_by_epic);
    }
    console.log(epics)
    return new backendPoints(epics, tickets_done_be_by_epic);
}

// class frontendPoints {
//     constructor(epics, progress, pending) {
//         this.epics = epics;
//         this.progress = progress;
//         this.pending = pending;
//     }
// }
// exports.frontendPoints = async (project_id) => {
//     const [epics_rows] = await Epic.fetch_epic_link(project_id);
//     let epics = epics_rows.flat();
//     epics = epics.map(item => item.epic_link);

//     let progress = [];
//     let pending = [];
//     for (const epic of epics) {
//         const [progress_rows] = await Ticket.fetch_points_FE(epic);
//         progress.push(progress_rows[0].tickets_done);
//         const [estimate_rows] = await Ticket.fetch_estimate_FE(epic);
//         pending.push(estimate_rows[0].tickets_pending);
//     }

//     return new frontendPoints(epics, progress, pending);
// }

