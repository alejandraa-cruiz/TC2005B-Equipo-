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


