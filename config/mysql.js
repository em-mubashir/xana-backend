const mysql = require('mysql');
const {
  dbHost,
  dbName,
  dbPort,
  dbConnections,
  dbUser,
  dbPassword,
} = require('../environment');

const transaction = mysql.createPool({
  connectionLimit: dbConnections,
  host: dbHost,
  user: dbUser,
  port: dbPort,
  password: dbPassword,
  database: dbName,
});

module.exports = transaction;
