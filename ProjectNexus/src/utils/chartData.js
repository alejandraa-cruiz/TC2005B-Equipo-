require('dotenv').config();
const Project = require("../models/project.model");
const ProjectTeam = require("../models/project_team.model");
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
    let points_done = [0]; 
    let goal_points = [0]; 
    const [scope_rows] =  await Ticket.fetch_scope(project_id, week_start, date_rows[0].week_start);
    const scope_points = scope_rows[0].scope;
    const weekly_points = scope_points / weeks; 
    let scope = [scope_points];
    let goal_points_cont = 0;
    let done_aux = 0;
    let week_aux = 1;
    let week_list = [0];

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
    const [epic_titles] = await Epic.fetch_epic_title(project_id);
    const [epic_links] = await Epic.fetch_epic_link(project_id);
    let epic_links_flatten = epic_links.flat();
    epic_links_flatten = epic_links.map(item => item.epic_link);
    let epic_titles_flatten = epic_titles.flat();
    epic_titles_flatten = epic_titles.map(item => item.epic_title);
    
    let progress = [];
    let estimate = [];
    for (const epic of epic_links_flatten) {
        const [progress_rows] = await Ticket.fetch_done(epic);
        progress.push(progress_rows[0].tickets_done);
        const [estimate_rows] = await Ticket.fetch_not_done(epic);
        estimate.push(estimate_rows[0].tickets_pending);
    }

    return new EstimateProgressChart(epic_titles_flatten, progress, estimate);
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
    constructor(epics, tickets_done_be_by_epic, story_points_missing, story_points_done,colors) {
        this.epics = epics;
        this.tickets_done_be_by_epic = tickets_done_be_by_epic;
        this.story_points_missing = story_points_missing;
        this.story_points_done = story_points_done;
        this.colors = colors;
    }
}
exports.backendPoints = async (project_id) => {
    const [epics_rows] = await Epic.fetch_epic_link(project_id);
    const [epic_titles] = await Epic.fetch_epic_title(project_id);
    let epics = epics_rows.flat();
    epics = epics.map(item => item.epic_link);
    let epic_titles_flatten = epic_titles.flat();
    epic_titles_flatten = epic_titles.map(item => item.epic_title);

    let index = 0, toDopoints = 0, donePoints = 0;
    let tickets_done_be_by_epic = [];
    let tickets_to_do_by_epic = [];
    let tickets_progress_by_epic = [];
    let tickets_review_by_epic = [];
    let tickets_missing_be_by_epic = [];
    let colors = ['rgb(1, 41, 95)','rgb(67,127,151)','rgb(132,147,36)', 'rgb(255, 179, 15)','rgb(253, 21, 27)'];

    for(const epic of epics) {
        const [done_be_by_epic] = await Ticket.tickets_done_be_by_epic(epic);
        tickets_done_be_by_epic.push(done_be_by_epic[0].tickets_done_be_by_epic);
        const [to_do_by_epic] = await Ticket.tickets_in_to_do_be_by_epic(epic);
        tickets_to_do_by_epic.push(to_do_by_epic[0].story_points_to_do_epic);
        const [progress_by_epic] = await Ticket.tickets_in_progress_be_by_epic(epic);
        tickets_progress_by_epic.push(progress_by_epic[0].story_points_progress_epic);
        const [review_by_epic] = await Ticket.tickets_in_review_be_by_epic(epic);
        tickets_review_by_epic.push(review_by_epic[0].story_points_review_epic);
        tickets_missing_be_by_epic.push(
            (tickets_review_by_epic[index]) +
            (tickets_to_do_by_epic[index]) +
            (tickets_progress_by_epic[index++]));
    }
    tickets_done_be_by_epic.forEach(storyPoints =>{
        donePoints += storyPoints;
    })
    tickets_missing_be_by_epic.forEach(storyPoints =>{
        toDopoints += storyPoints;
    })
    return new backendPoints(epic_titles_flatten, tickets_done_be_by_epic, toDopoints, donePoints,colors);
}

class frontendPoints {
    constructor(epics, story_points_fe_done, story_points_fe_missing, story_points_fe_total_done, colors) {
        this.epics = epics;
        this.story_points_fe_done = story_points_fe_done;
        this.story_points_fe_missing = story_points_fe_missing;
        this.story_points_fe_total_done = story_points_fe_total_done;
        this.colors = colors;
    }
}

exports.frontendPoints = async(project_id) =>{
    const [epics_rows] = await Epic.fetch_epic_link(project_id);
    let epics = epics_rows.flat();
    epics = epics.map(item => item.epic_link);
    const [epic_titles] = await Epic.fetch_epic_title(project_id);
    let epic_titles_flatten = epic_titles.flat();
    epic_titles_flatten = epic_titles.map(item => item.epic_title);
    let colors= ['rgb(1, 41, 95)','rgb(67,127,151)','rgb(132,147,36)', 'rgb(255, 179, 15)','rgb(253, 21, 27)'];
    let story_points_fe_done = [];
    const [story_points_fe_missing] = await Ticket.story_points_fe_missing(project_id);
    let story_points_fe_total_done =0;

    for(const epic of epics) {
        const [done_fe_story] = await Ticket.story_points_fe_done(epic);
        story_points_fe_done.push(done_fe_story[0].story_points_fe_done);
    }

    story_points_fe_done.forEach((elem)=>{
        story_points_fe_total_done= story_points_fe_total_done + elem;
    })

    return new frontendPoints(epic_titles_flatten, story_points_fe_done, story_points_fe_missing[0].story_points_fe_missing, story_points_fe_total_done, colors);
}

class teamWeeks {
    constructor(story_points_be, story_points_fe){
        this.story_points_be = story_points_be;
        this.story_points_fe = story_points_fe;
    }
}

exports.teamWeeks = async (project_id) => {
    const [be_points] = await ProjectTeam.fetch_be_points(project_id);
    const [fe_points] = await ProjectTeam.fetch_fe_points(project_id);
    console.log(fe_points[0].fe_points);
    return new teamWeeks(be_points[0].be_points, fe_points[0].fe_points);
}