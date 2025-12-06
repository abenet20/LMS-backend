const mysql = require("mysql2");

const database = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12810813",
  password: "JYKGvIHUnB",
  database: "sql12810813",
  // connection config tweaks to fail faster on network issues
  connectTimeout: 10000, // 10s
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = database.promise();