const mysql = require("mysql2");

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "my_database",
});

module.exports = database.promise();