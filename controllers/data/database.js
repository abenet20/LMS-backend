const mysql = require("mysql2");

const database = mysql.createPool({
  host: "http://sql12.freesqldatabase.com/",
  user: "sql12810813",
  password: "JYKGvIHUnB",
  database: "sql12810813",
});

module.exports = database.promise();