const CSVparser = require('../utils/CSVparser');

const { readFileSync } = require('fs');
const csv = readFileSync(__dirname + '/mock/Jira.csv', 'utf-8');

test('Parses csv', () => {
    expect(CSVparser(csv)).toBeInstanceOf(Object);
    expect(() => { CSVparser(',,\n,') }).toThrow(`Row headers don't match `);
});
