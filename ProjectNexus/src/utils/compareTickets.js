/**
 * 
 * @param {Ticket} t1 
 * @param {Ticket} t2 
 */
exports.compareTickets = (t1, t2) => {
    return (
        t1.issueKey === t2.issueKey &&
        t1.summary === t2.summary &&
        t1.issue_type === t2.issue_type &&
        t1.storyPoints === t2.storyPoints &&
        t1.ticket_status === t2.ticket_status &&
        t1.label === t2.label &&
        new Date(t1.update_date).getTime() === new Date(t2.update_date).getTime()
    );
}