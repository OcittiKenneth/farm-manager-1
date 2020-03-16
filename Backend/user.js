const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "secretkey23456";
const router = express.Router();


router.post("/login", (req, res) => {
  const { email, password } = req.body;
  database.get(`SELECT * FROM users WHERE email=?`, email, (err, row) => {
    if (!row) return res.status(401).send("invalid email");

    const result = bcrypt.compareSync(password, row.password);
    console.log(result);
    if (result) {
      const payload = { userInformation: row };
      console.log(payload)
      const token = jwt.sign(payload, SECRET_KEY);
      let currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1);

      res.json({ token: token, expiresOn: currentDate.toISOString() });
    } else res.status(401).json({ password: "Password is incorrect" })

  });
});

// module.exports = router;