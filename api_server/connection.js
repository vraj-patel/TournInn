const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || require('./nodemon.json').env.DB_PASSWORD,
  database: "TournInn",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
    console.log(err);
  }
});

module.exports = mysqlConnection;
