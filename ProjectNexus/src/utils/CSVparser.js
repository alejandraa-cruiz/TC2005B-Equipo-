const Ticket = require("../models/ticket.model");

const validHeaders = [
    'Issue key',
    'Issue id',
    'Summary',
    'Issue Type',
    'Custom field (Story Points)',
    'Status',
    'Custom field (Epic Link)',
    'Epic Link Summary',
    'Updated',
    'Assignee',
    'Assignee Id',
    'Labels',
    'Labels',
    'Labels'
];

const regexMathcer = new RegExp(("(\\" + ',' + "|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\"\\" + ',' + "\\r\\n]*))"),"gi");

/**
 * 
 * @param {Array} arr 
 * @param {any} elem 
 */
const pushUnique = (arr, elem) => {
    if(arr.indexOf(elem) === -1) {
        arr.push(elem);
    }
}

module.exports = class TicketDataset {
    /**
     * 
     * @param {[Ticket]} tickets 
     * @param {[String]} epics 
     */
    constructor(tickets, epics) {
        this.tickets = tickets || [];
        this.epics = epics || [];
    }

    /**
     * 
     * @param {String} csvString 
     * @returns {TicketDataset}
     */
    static parseCSV = (csvString) => {
        const dataMatrix = [[]];
        let matches;
        while(matches = regexMathcer.exec(csvString)) {
            let delimiter = matches[1];
            if(delimiter.length && delimiter !== ',') {
                dataMatrix.push([]);
            }
            let value;
            if(matches[2]){
                value = matches[2].replace(/""/g, "\"");
            } else {
                value = matches[3];
            }
            dataMatrix[dataMatrix.length - 1].push(value);
        }
        dataMatrix.pop();
        if(dataMatrix[0].toString() === validHeaders.toString()) {
            // Los headers coinciden
            // Extraemos todos los epics sin repetir
            const ticketDataset = new TicketDataset();
            const rowLenght = dataMatrix[0].length;
            // Iteramos desde el 1 para omitir la primera fila 
            for(let i = 1; i < dataMatrix.length; i++) {
                const row = dataMatrix[i];
                if(row.length !== rowLenght) {
                    throw new RangeError('Not all rows are the same lenght');
                }
                
                pushUnique(ticketDataset.epics, row[6]);
                
                const dateString = new Date(Date.parse(row[8])).toISOString().split('.')[0].replace('T', ' ');

                const ticket = new Ticket({
                    epic_link: row[6],
                    issueKey: row[0],
                    summary: row[2],
                    issue_type: row[3],
                    storyPoints: Number(row[4]),
                    ticket_status: row[5],
                    label: row[11],
                    update_date: dateString
                });
                ticketDataset.tickets.push(ticket)
            }
            return ticketDataset;
        } else {
            // Los headers no coinciden
            throw new TypeError(`Row headers don't match`)
        }
    }
}
