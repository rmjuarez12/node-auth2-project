//* Import jsonwebtokens and the secrets
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

//* Check if user is logged in
const checkIfLoggedIn = (req, res, next) => {
  // Authorization: Bearer <token>
  const token = req.headers?.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token", error: err });
      } else {
        req.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token found" });
  }
};

//* Check user role
const checkUserDepartment = (req, res, next) => {
  const userDepartment = req?.decodedJWT?.department;

  if (userDepartment) {
    req.userDepartment = userDepartment;
  } else {
    req.userDepartment = null;
  }

  next();
};

module.exports = {
  checkIfLoggedIn,
  checkUserDepartment,
};
