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

app.get("/data", function(req, res) {
  var sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/data", function(req, res) {
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

app.listen(3002, () => {
  console.log("Server is running at port 3002");
});

// // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // Creating a  variable html_dir that stores the path to the folder with static files
// // var js_dir = "./src/public/components/";

// // Setting the app to use the different libraries
// app.use(morgan("short"));
// app.use(parser.urlencoded({ extended: false }));
// app.use(express.static("./src/public/components/"));
// app.use(
//   session({
//     // This helps to not expose one's information to another person
//     secret: "secret",
//     // This keeps saving sessions and can tell how many times someone has logged into the system
//     resave: true,
//     // This listens and saves even sessions that are not successfully logged in.
//     saveUninitialized: true
//   })
// );

// // Route to fetch the index page
// app.get("/", function(req, res) {
//   // res.sendfile(js_dir + "Home.js");
//   res.send("hello select a product!");
// });

// // Route to fetch the register page
// app.get("/register", (req, res) => {
//   res.sendfile(html_dir + "register.html");
// });

// // Route to fetch the login page
// app.get("/login", (req, res) => {
//   res.sendfile(html_dir + "login.html");
// });

// // Route to fetch the home page
// app.get("/home", (req, res) => {
//   if (req.session.loggedin) {
//     // Response/ message that one sees when they have successfully logged in
//     res.send("Welcome back, " + req.session.username + "!");
//   } else {
//     // Response/ message that one sees when they want to access the home page
//     // but have not successfully logged in
//     res.send("Please login to view this page!");
//   }
//   // Ending of session
//   res.end();
// });

// // // Creating connection to the database
// // const connection = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   database: "registration",
// //   password: "Sweetmom1844."
// // });

// // // Message to show connection status
// // connection.connect(err => {
// //   if (err) throw err;
// //   console.log("Connected!");
// // });

// // Route to capture and post data using the registration form
// app.post("/userdetails", (req, res) => {
//   let object = {
//     userid: req.body.userId,
//     password: req.body.password,
//     name: req.body.nam,
//     address: req.body.address,
//     country: req.body.myselect,
//     zip: req.body.zipcode,
//     mail: req.body.email,
//     gender: req.body.myRadios,
//     language: req.body.myChecks,
//     about: req.body.notes,
//     //Hashing/encrypting the password entered at signup
//     hash: crypto
//       .createHash("md5")
//       .update(req.body.password)
//       .digest("hex")
//   };

//   //Inserting data into the database
//   const querrystring =
//     "INSERT INTO register(userid,pass,name,address,country,zip,email,gender,lang,about) VALUES(?,?,?,?,?,?,?,?,?,?)";
//   connection.query(querrystring, [
//     object.userid,
//     object.hash,
//     object.name,
//     object.address,
//     object.country,
//     object.zip,
//     object.mail,
//     object.gender,
//     object.language,
//     object.about
//   ]);

//   //Printing out the object in a json format
//   console.log("All the form inputs are" + JSON.stringify(object));
//   //Redirecting the user to the login page after registering
//   res.redirect("/login");
//   //Ending the session
//   res.end();
// });

// //Route to post login data
// app.post("/auth", (req, res) => {
//   // Requesting the username and password and assigning them to variables
//   // usernam and passw respectively
//   var usernam = req.body.username;
//   var passw = req.body.password;

//   //Hashing or encrypting the password as it is being typed at login
//   var hash = crypto
//     .createHash("md5")
//     .update(req.body.password)
//     .digest("hex");

//   //Defining a varible querrystring to store the sql query
//   // 'SELECT * FROM register WHERE name =? AND pass=?'
//   let querrystring = "SELECT * FROM register WHERE name =? AND pass=?";

//   //Condition to loop through users to find that with the specified username and password
//   if (usernam && passw) {
//     //Creating a query on the database
//     connection.query(
//       querrystring,
//       [usernam, hash],
//       (error, results, fields) => {
//         // Condition to loop through users to find one with the specified username and password
//         if (results.length > 0) {
//           //In case one has logged in
//           req.session.loggedin = true;
//           //Request the username
//           req.session.username = usernam;
//           //Redirect to the home page
//           res.redirect("/home");
//           //Statement executed only if the user has not provided the right credentials
//         } else {
//           res.send("incorrect username and /or password");
//         }
//         //Ending session
//         res.end();
//       }
//     );
//     //Statement executed if the user has not entered a username and/password
//   } else {
//     res.send("please enter username and password");
//     //Ending session
//     res.end();
//   }
//   //Printing the username and hashed password to the console
//   console.log("captured " + usernam + " " + hash);
// });

// // Port at which the app is running
// app.listen(3002);

// //Printing a message to the console to show on which port the app is running
// console.log("app running at Port 3002");

// nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// var expressValidator = require("express-validator");
// var flash = require("express-flash");
// var session = require("express-session");
// var bodyParser = require("body-parser");

// const mysql = require("mysql");
// var connection = require("./src/db/db");

// var indexRouter = require("./src/routes/index");
// var usersRouter = require("./src/routes/users");
// var emplyeesRouter = require("./src/routes/employees");

// const app = express();

// // view engine setup
// server.set("views", path.join(__dirname, "views"));
// server.set("view engine", "ejs");

// server.use(logger("dev"));
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(cookieParser());
// server.use(express.static(path.join(__dirname, "public")));

// server.use(
//   session({
//     secret: "123456cat",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }
//   })
// );

// server.use(flash());
// // server.use(expressValidator());

// server.use("/", indexRouter);
// server.use("/users", usersRouter);
// server.use("/employees", emplyeesRouter);

// // catch 404 and forward to error handler
// server.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// server.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.server.get("env") === "development" ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
// module.exports = server;

// nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
// const path = require("path");
// const express = require("express");
// // const hbs = require('hbs');
// const bodyParser = require("body-parser");

// const mysql = require("mysql");
// var connection = require("./src/db/db");

// var indexRouter = require("./src/routes/index");
// var usersRouter = require("./src/routes/users");
// var emplyeesRouter = require("./src/routes/employees");

// const server = express();

// app.set("views", path.join(__dirname, "views"));
// //set view engine
// app.set("view engine", "hbs");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// //set public folder as static folder for static file
// app.use("/assets", express.static(__dirname + "/public"));

// //route for homepagez
// app.get("/", (req, res) => {
//   let sql = "SELECT * FROM product";
//   let query = conn.query(sql, (err, results) => {
//     if (err) throw err;
//     res.render("product_view", {
//       results: results
//     });
//   });
// });

// //route for insert data
// app.post("/save", (req, res) => {
//   let data = {
//     product_name: req.body.product_name,
//     product_price: req.body.product_price
//   };
//   let sql = "INSERT INTO product SET ?";
//   let query = conn.query(sql, data, (err, results) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
// });

// //route for update data
// app.post("/update", (req, res) => {
//   let sql =
//     "UPDATE product SET product_name='" +
//     req.body.product_name +
//     "', product_price='" +
//     req.body.product_price +
//     "' WHERE product_id=" +
//     req.body.id;
//   let query = conn.query(sql, (err, results) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
// });

// //route for delete data
// app.post("/delete", (req, res) => {
//   let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
//   let query = conn.query(sql, (err, results) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
// });

// //server listening
// app.listen(8000, () => {
//   console.log("Server is running at port 8000");
// });
