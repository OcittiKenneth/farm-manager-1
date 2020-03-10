/*Defining variables and assigning them the required libraries needed to run the application */
const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");
const crypto = require("crypto");
const session = require("express-session");
const cors = require("cors");

const mysql = require("mysql");
var db = require("./db/db");

// var indexRouter = require("./src/routes/index");
// var usersRouter = require("./src/routes/users");
// var emplyeesRouter = require("./src/routes/employees");

//Creating an app using the express module
const app = express();
app.use(parser.json());
app.use(cors());

app.get("/data", function (req, res) {
  var sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/data", function (req, res) {
  console.log(req.body);
  var data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  };
  var sql = "INSERT INTO users SET ?";
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({
      status: "Data has been captured!",
      id: null,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    });
  });
});

app.post("/api", (req, res) => {
  const myData = {
    name: req.body.name,
    quantity: req.body.quantity,
    quantityUsed: req.body.quantityUsed,
    quantityBalance: req.body.quantityBalance,
    description: req.body.description,
    notification: req.bodynotification,
    takenBy: req.body.takenBy
  };
  const mySql = "INSERT INTO consumable SET ?";
  db.query(mySql, myData, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send()
  })
});

app.listen(3002, () => {
  console.log("Server is running at port 3002");
});
