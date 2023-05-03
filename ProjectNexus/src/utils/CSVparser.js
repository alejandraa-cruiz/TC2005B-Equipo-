const Epic = require("../models/epic.model");
const Ticket = require("../models/ticket.model");

// Expected headers on the parsed csv file
const expectedHeaders = [
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

// Regex to get the characters before a comma (ignores field commas)
const csvExtractor = /(\,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\,\r\n]*))/gi

/**
 * Pushes an element into the array if it is not present already
 * @param {Array} arr 
 * @param {any} elem 
 */
const pushUnique = (arr, elem) => {
  if(arr.indexOf(elem) === -1) {
    arr.push(elem);
  }
}

/**
 * Pushes a list of epic links into a guiven list of epics
 * @param {Epic[]} epics
 * @param {String[]} links 
 */
const pushEpicsFromLinks = (epics, links) => {
  links.forEach(epic_link => {
    epics.push(new Epic({epic_link: epic_link}));
  });
}

/**
 * Converts a list of epic_link strings into Epic objects
 * @param {String[]} arr 
 * @returns {Epic[]} 
 */
 const epicListFromArray = (arr) => {
  const epics = [];
  arr.forEach(elem => {
    epics.push(new Epic({epic_link: elem}));
  });
  return epics;
}

/**
 * 
 * @param {[Epic]} arr 
 * @param {String} epic_link 
 * @param {String} epic_title 
 */
const pushUniqueEpic = (arr, epic_link, epic_title) => {
  if(arr.length === 0){
    arr.push(new Epic({epic_link: epic_link, epic_title: epic_title}));
    return;
  }
  
  let occurrences = 0;
  arr.forEach((elem) => {
    if(elem.epic_link === epic_link) {
      occurrences++;
    }

  });
  if(occurrences === 0){
    arr.push(new Epic({epic_link: epic_link, epic_title: epic_title}));
  }
    
}

module.exports = class TicketDataset {
  /**
   * 
   * @param {Ticket[]} tickets 
   * @param {Epic[]} epics 
   */
  constructor(tickets, epics) {
    this.tickets = tickets || [];
    this.epics = epics || [];
  }

  /**
   * Extract the epics and tickets from a csv string
   * @param {String} csvString 
   * @returns {TicketDataset | RangeError | TypeError}
   */
  static parseCSV = (csvString) => {
    // The csv rows are converted into lists and appended to dataMatrix
    const dataMatrix = [[]];
    let matches;
    while(matches = csvExtractor.exec(csvString)) {
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

    // The first list should be equal to the expected headers
    if(dataMatrix[0].toString() !== expectedHeaders.toString()) {
      // The headers are different
      return new TypeError('Row headers don\'t match');
    }

    const ticketDataset = new TicketDataset();
    const epicLinks = [];
    // The row lenght should be the same for all rows
    const rowLenght = dataMatrix[0].length;

    // We iterate the following rows on the matrix
    for(let i = 1; i < dataMatrix.length; i++) {
      const row = dataMatrix[i];
      if(row.length !== rowLenght) {
        // If only one row is not te same, the function fails
        return new RangeError('Not all rows are the same lenght');
      }
      
      // The date is given in the format 'DD/Mon/YY HH:MM a'
      // We process the string to match the format 'YYYY-MM-DD HH:MM:SS'
      const dateString = new Date(Date.parse(row[8]))
        .toISOString() // 'YYYY-MM-DDTHH:MM:SS.zzzZ'
        .split('.')[0] // 'YYYY-MM-DDTHH:MM:SS'
        .replace('T', ' ');  // 'YYYY-MM-DD HH:MM:SS'

      // We push the unique epic_links to an array
      pushUniqueEpic(epicLinks, row[6], row[7]);

      // We create a ticket from each row and push it to the ticket list
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
    
    ticketDataset.epics = epicLinks;
    return ticketDataset;
  }

}
