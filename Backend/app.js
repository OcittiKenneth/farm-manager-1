const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const session = require("express-session");
const cors = require("cors");

const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "secretkey23456";
const User = require("./user");
const { transporter, getPasswordResetURL, resetPasswordTemplate } = require("./email")

const database = new sqlite3.Database("./my.db")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(cors());

router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = bcrypt.hashSync(req.body.password, 10);

  var data = { name, email, password, phone }
  let sql = 'INSERT INTO users (name, email,phone, password) VALUES (?,?,?,?)'
  let params = [data.name, data.email, data.phone, data.password]
  database.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.json({
      "message": "success",
      "data": data,
      "id": this.lastID
    })
  });
});

router.post(User)
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   database.get(`SELECT * FROM users WHERE email=?`, email, (err, row) => {
//     if (!row) return res.status(401).send("invalid email");

//     const result = bcrypt.compareSync(password, row.password);
//     console.log(result);
//     if (result) {
//       const payload = { userInformation: row };
//       console.log(payload)
//       const token = jwt.sign(payload, SECRET_KEY);
//       let currentDate = new Date();
//       currentDate.setHours(currentDate.getHours() + 1);

//       res.json({ token: token, expiresOn: currentDate.toISOString() });
//     } else res.status(401).json({ password: "Password is incorrect" })

//   });
// });

router.get("/users", (req, res) => {
  let sql = "SELECT * FROM users"
  let params = []
  database.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
})

const createUserTable = () => {
  const sqlQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id interger PRIMARY KEY,
    name text,
    email text UNIQUE,
    phone interger,
    password text)`;

  return database.run(sqlQuery);
}

createUserTable();



/*** Calling this function with a registered user's email sends an email IRL ***/
/*** I think Nodemail has a free service specifically designed for mocking   ***/


// send password reset email 
router.post("/sendPasswordResetEmail", (req, res) => {
  const { email } = req.params
  const user = User.findOne({ email }).exec();

  if (!user) return res.status(404).json("No user with that email");
  const payload = { userInformation: row };
  const token = jwt.sign(payload, SECRET_KEY);
  const url = getPasswordResetURL(user, token);
  const emailTemplate = resetPasswordTemplate(user, url);

  const sendEmail = () => {
    transporter.sendEmail(emailTemplate, (err, info) => {

      if (err) {
        res.status(500).json("Error sending email");
      }
      console.log(`** Email sent **`, info.res);
    });
  }
  sendEmail();
})

// receiveNewPassword 
router.get("/receiveNewPassword", (req, res) => {

  const usePasswordHashToMakeToken = ({
    password: passwordHash,
    id: userId,
    createdAt
  }) => {
    const secret = passwordHash + "-" + createdAt
    const token = jwt.sign({ userId }, secret, {
      expiresIn: 3600
    })
    return token
  }
  usePasswordHashToMakeToken()

  const { userId, token } = req.params
  const { password } = req.body

  User.findOne({ id: userId })
    .then(user => {
      const secret = user.password + "-" + user.createdAt
      const payload = jwt.decode(token, secret)

      if (payload.userId === user.id) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return bcrypt.hash(password, salt, (err, hash) => {
            if (err) return
            User.findOneAndUpadte({ id: userId }, { password: hash })
              .then(() => res.status().json("Password changed succesfully"))
              .catch(err => res.status(500).json(err))
          })
        })
      }
    })
    .catch(() => {
      res.status(404).json("Invalid user");
    })
})

app.listen(3002, () => {
  console.log("Server is running at port 3003");
});
