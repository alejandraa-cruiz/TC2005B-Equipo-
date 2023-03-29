require('dotenv');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD
});

module.exports = pool.promise();