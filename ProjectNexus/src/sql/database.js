const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'projectNexusTesting'
});

module.exports = pool.promise();