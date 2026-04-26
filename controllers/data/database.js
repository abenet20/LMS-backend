const mysql = require("mysql2");
require("dotenv").config();

const database = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
  port: process.env.db_port,
  // connection config tweaks to fail faster on network issues
  connectTimeout: 10000, // 10s
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = database.promise();
