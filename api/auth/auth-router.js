//* Import express and setup router
const express = require("express");
const router = express.Router();

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

  usersModel.getByUsername(username).then((user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: "Welcome my friend" });
    } else {
      res.status(401).json({ message: "Invalid login details" });
    }
  });
});

//* Export Router
module.exports = router;
