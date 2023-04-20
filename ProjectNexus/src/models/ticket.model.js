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
        return connection.query(query,[this.issueKey , this.summary, this.issue_type, 
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
}