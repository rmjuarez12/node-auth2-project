//* Import express and setup router
const express = require("express");
const router = express.Router();

//* Import jsonwebtoken and secrets file
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

//* Import dcryptjs
const bcrypt = require("bcryptjs");

//* Import models
const usersModel = require("./../users/users-model");

//* Handle Endpoints

//-- POST
// Register a user
router.post("/register", (req, res) => {
  const newUser = req.body;

  //* Hash password
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  usersModel
    .addNewUser(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating user", error: err });
    });
});

// Login a user
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  usersModel
    .getByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: "Welcome my friend", token });
      } else {
        res.status(401).json({ message: "Invalid login details" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//-- GET
// Logout a user
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send("There was an error killing the session");
      } else {
        res.send("Session demolished!");
      }
    });
  } else {
    res.end();
  }
});

//* Function to generate a token
function generateToken(user) {
  // Pass info about user
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };

  // Options, such as when token expires
  const options = {
    expiresIn: "1h",
  };

  // Secret string
  const secret = secrets.jwtSecret;

  return jwt.sign(payload, secret, options);
}

//* Export Router
module.exports = router;
