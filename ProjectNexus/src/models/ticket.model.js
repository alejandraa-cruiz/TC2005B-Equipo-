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
    save() {
        let query = `
        INSERT INTO ticket (id_epic, issueKey, summary, issue_type, storyPoints, ticket_status, label, update_date)
        SELECT id_epic, ?, ?, ?, ?, ?, ?, ?
        FROM epic
        WHERE epic_link = ?;
        `;
        return db.query(query, [this.issueKey , this.summary, this.issue_type, 
                                this.storyPoints, this.ticket_status, this.label,
                                this.update_date, this.epic_link]);
    }

    static fetch_done_week(id_project, start_date, end_date) {
        let query = `SELECT SUM(storyPoints) as points_done FROM ticket 
        WHERE update_date BETWEEN ? AND ? 
        AND ticket_status = 'Done'
        AND id_epic IN
        (SELECT id_epic FROM epic WHERE id_project = ?)`

        return db.execute(query, [start_date, end_date, id_project]);
    }

    static fetch_scope(id_project) {
        let query = `SELECT SUM(storyPoints) as scope FROM ticket 
        WHERE id_epic IN
        (SELECT id_epic FROM epic WHERE id_project = ?)`

        return db.execute(query, [id_project]);
    }

    static fetch_done(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_done FROM ticket
        WHERE ticket_status = 'Done' AND id_epic IN
        (SELECT id_epic FROM epic WHERE epic_link = ?)`

        return db.execute(query, [epic_link]);
    }

    static fetch_not_done(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_pending FROM ticket
        WHERE ticket_status != 'Done' AND ticket_status != 'Canceled'
        AND id_epic IN
        (SELECT id_epic FROM epic WHERE epic_link = ?)`

        return db.execute(query, [epic_link]);
    }

    static fetch_points_BE(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_done FROM ticket
        WHERE ticket_status = 'Done' AND label='part/Backend'AND id_epic IN
        (SELECT id_epic FROM epic WHERE epic_link = ?);`

        return db.execute(query, [epic_link]);
    }

    static fetch_estimate_BE(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_done FROM ticket
        WHERE ticket_status != 'Done' AND label='part/Backend'AND id_epic IN
        (SELECT id_epic FROM epic WHERE epic_link = ?);`

        return db.execute(query, [epic_link]);
    }

    static fetch_points_FE(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_done FROM ticket
        WHERE ticket_status = 'Done' AND label='part/Frontend'AND id_epic IN
        (SELECT id_epic FROM epic WHERE epic_link = ?);`

        return db.execute(query, [epic_link]);
    }

    static fetch_estimate_FE(epic_link) {
        let query = `SELECT COUNT(id_ticket) as tickets_done FROM ticket
        WHERE ticket_status != 'Done' AND label='part/Frontend'AND id_epic IN
        (SELECT id_epic FROM epic WHERE epic_link = ?);`

        return db.execute(query, [epic_link]);
    }

    static tickets_done(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_done
        FROM ticket 
        WHERE ticket_status = 'Done'
        AND id_epic IN (SELECT id_epic 
                        FROM Epic 
                        WHERE id_project = ?);`

        return db.execute(query, [id_project]);
    }

    static tickets_to_do(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_to_do
        FROM ticket 
        WHERE ticket_status = 'To Do'
        AND id_epic IN (SELECT id_epic 
                        FROM Epic 
                        WHERE id_project = ?);`

        return db.execute(query, [id_project]);
    }

    static tickets_code_review(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_code_review
        FROM ticket 
        WHERE ticket_status = 'Code Review'
        AND id_epic IN (SELECT id_epic 
                        FROM Epic 
                        WHERE id_project = ?);`

        return db.execute(query, [id_project]);
    }
    
    static tickets_in_progress(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_in_progress
        FROM ticket 
        WHERE ticket_status = 'In Progress'
        AND id_epic IN (SELECT id_epic 
                        FROM Epic 
                        WHERE id_project = ?);`

        return db.execute(query, [id_project]);
    }

    static tickets_canceled(id_project) {
        let query = `SELECT COUNT(id_ticket) as tickets_canceled 
        FROM ticket 
        WHERE ticket_status = 'Canceled'
        AND id_epic IN (SELECT id_epic 
                        FROM Epic 
                        WHERE id_project = ?);`

        return db.execute(query, [id_project]);
    }

}