const db = require("../utils/database");

module.exports = class Ticket {
    constructor(Ticket) {
        this.epic_link = Ticket.epic_link; // Sting
        this.issueKey = Ticket.issueKey; // String
        this.summary = Ticket.summary; // String
        this.issue_type = Ticket.issue_type; // String
        this.storyPoints = Ticket.storyPoints; // Number
        this.ticket_status = Ticket.ticket_status; // String
        this.label = Ticket.label; // Sting
        this.update_date = Ticket.update_date; // Date String
    }
    save(connection = db) {
        let query = `
        INSERT INTO ticket (id_epic, issueKey, summary, issue_type, storyPoints, 
                            ticket_status, label, update_date)
        SELECT id_epic, ?, ?, ?, ?, ?, ?, ?
        FROM epic
        WHERE epic_link = ?
        AND (SELECT count(*) 
             FROM ticket 
             WHERE issueKey = ? AND update_date >= ? FOR UPDATE) = 0;`;
        return connection.query(query,
                               [this.issueKey , this.summary, this.issue_type, 
                               this.storyPoints, this.ticket_status, this.label,
                               this.update_date, this.epic_link, this.issueKey,
                               this.update_date]);
    }

    update(id_ticket, connection = db) {
        const query = `UPDATE ticket SET 
                            issueKey = ?,
                            summary = ?,
                            issue_type = ?,
                            storyPoints = ?,
                            ticket_status = ?,
                            label = ?,
                            update_date = ?
                            WHERE id_ticket = ?`;
        return connection.execute(query, [this.issueKey, this.summary, 
                                          this.issue_type, this.storyPoints, 
                                          this.ticket_status, this.label, 
                                          this.update_date, id_ticket]);
    }

    static fetchByIssueKey(issueKey, connection = db){
        const query = `SELECT * FROM ticket WHERE issueKey = ?`;
        return connection.execute(query, [issueKey]);
    }

    static fetch_done_week(id_project, start_date, end_date) {
        let query = `SELECT SUM(storyPoints) as points_done FROM ticket 
                            WHERE update_date BETWEEN ? AND ? 
                            AND ticket_status = 'Done'
                            AND id_epic IN
                            (SELECT id_epic FROM epic WHERE id_project = ?)`;

        return db.execute(query, [start_date, end_date, id_project]);
    }

    static fetch_scope(id_project) {
        let query = `SELECT SUM(storyPoints) as scope FROM ticket 
                    WHERE id_epic IN
                    (SELECT id_epic FROM epic WHERE id_project = ?)`;

        return db.execute(query, [id_project]);
    }

    static fetch_done(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_done FROM ticket
                     WHERE ticket_status = 'Done' AND id_epic IN
                     (SELECT id_epic FROM epic WHERE epic_link = ?)`;

        return db.execute(query, [epic_link]);
    }

    static fetch_not_done(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_pending 
                     FROM ticket
                     WHERE ticket_status != 'Done' 
                     AND ticket_status != 'Canceled'
                     AND id_epic IN
                     (SELECT id_epic FROM epic WHERE epic_link = ?)`;

        return db.execute(query, [epic_link]);
    }

    static tickets_done(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_done
                     FROM ticket 
                     WHERE ticket_status = 'Done'
                     AND id_epic IN (SELECT id_epic 
                                     FROM epic 
                                     WHERE id_project = ?);`;

        return db.execute(query, [id_project]);
    }

    static tickets_to_do(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_to_do
                     FROM ticket 
                     WHERE ticket_status = 'To Do'
                     AND id_epic IN (SELECT id_epic 
                                     FROM epic 
                                     WHERE id_project = ?);`;

        return db.execute(query, [id_project]);
    }

    static tickets_code_review(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_code_review
                     FROM ticket 
                     WHERE ticket_status = 'Code Review'
                     AND id_epic IN (SELECT id_epic 
                                     FROM epic 
                                     WHERE id_project = ?);`;

        return db.execute(query, [id_project]);
    }
    
    static tickets_in_progress(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_in_progress
                     FROM ticket 
                     WHERE ticket_status = 'In Progress'
                     AND id_epic IN (SELECT id_epic 
                                     FROM epic 
                                     WHERE id_project = ?);`;

        return db.execute(query, [id_project]);
    }

    static tickets_canceled(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_canceled 
                     FROM ticket 
                     WHERE ticket_status = 'Canceled'
                     AND id_epic IN (SELECT id_epic 
                                     FROM epic 
                                     WHERE id_project = ?);`;

        return db.execute(query, [id_project]);
    }

    static tickets_done_be_by_epic(epic_link){
        let query = `SELECT SUM(storyPoints) as tickets_done_be_by_epic 
                     FROM ticket
                     WHERE ticket_status = 'Done' 
                     AND label = 'part/Backend'
                     AND id_epic IN (SELECT id_epic 
                                     FROM epic WHERE epic_link = ?);`;

        return db.execute(query,[epic_link]);
    }

    static tickets_in_progress_be_by_epic(epic_link){
        let query = `SELECT SUM(storyPoints) as story_points_progress_epic 
                     FROM ticket
                     WHERE ticket_status = 'In Progress'
                     AND label = 'part/Backend'
                     AND id_epic IN(SELECT id_epic 
                                    FROM epic WHERE epic_link = ?);`;

        return db.execute(query,[epic_link]);
    }

    static tickets_in_review_be_by_epic(epic_link){
        let query = `SELECT SUM(storyPoints) as story_points_review_epic 
                     FROM ticket
                     WHERE ticket_status = 'Code Review'
                     AND label = 'part/Backend'
                     AND id_epic IN(SELECT id_epic 
                                    FROM epic WHERE epic_link = ?);`;
        return db.execute(query,[epic_link]);
    }

    static tickets_in_to_do_be_by_epic(epic_link){
        let query = `SELECT SUM(storyPoints) as story_points_to_do_epic FROM ticket
                     WHERE ticket_status = 'To Do'
                     AND label = 'part/Backend'
                     AND id_epic IN(SELECT id_epic 
                                    FROM epic WHERE epic_link = ?);`;
        return db.execute(query,[epic_link]);
    }

    static story_points_fe_done(epic_link){
        let query = `SELECT SUM(storyPoints) as story_points_fe_done
                     FROM ticket
                     WHERE ticket_status = 'Done'
                     AND label = 'part/Frontend'
                     AND id_epic IN(SELECT id_epic 
                                    FROM epic WHERE epic_link = ?);`;

        return db.execute(query,[epic_link]);
    }

    static tickets_pending_be(id_project){
        let query = `SELECT COUNT(id_ticket) as tickets_pending_be
                     FROM ticket
                     WHERE ticket_status != 'Done'
                     AND label = 'part/Backend'
                     AND id_epic IN (SELECT id_epic
                                     FROM epic
                                     WHERE id_project = 1);`;

            return db.execute(query,[id_project])
    }

    static story_points_fe_missing(id_project){
        let query = `SELECT SUM(storyPoints) as story_points_fe_missing
                     FROM ticket
                     WHERE ticket_status != 'Done'
                     AND label = 'part/Frontend'
                     AND id_epic IN(SELECT id_epic 
                                    FROM epic WHERE id_project = ?);`;

            return db.execute(query,[id_project])
    }
}