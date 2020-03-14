var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "farmmanager"
});
db.connect(error => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mysql Connected...");
  }
});
module.exports = db;
