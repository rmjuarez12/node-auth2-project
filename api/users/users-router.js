//* Import express and setup router
const express = require("express");
const router = express.Router();

//* Import models
const usersModel = require("./users-model");

//* Import middleware and factor it
const getMiddleware = require("../middleware/middleware");
const { checkIfLoggedIn, checkUserDepartment } = getMiddleware;

//* Handle Endpoints

//-- GET
// Get all users
router.get("/", [checkIfLoggedIn, checkUserDepartment], (req, res) => {
  const { userDepartment } = req;

  usersModel
    .getByDepartment(userDepartment)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//* Export Router
module.exports = router;
