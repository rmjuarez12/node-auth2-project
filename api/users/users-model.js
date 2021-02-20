//* Import DB config
const db = require("../../data/db-config");

//* Get ALL users
function getAll() {
  return db("users");
}

//* Get user by ID
function getByID(id) {
  return db("users").where({ id }).first();
}

//* Get user by Username
function getByUsername(username) {
  return db("users").where({ username }).first();
}

//* Get user by Department
function getByDepartment(department) {
  return db("users").where({ department });
}

//* Create a new user
function addNewUser(user) {
  return db("users")
    .insert(user)
    .then((id) => {
      return getByID(id);
    });
}

//* Export functions
module.exports = {
  getAll,
  getByID,
  addNewUser,
  getByUsername,
  getByDepartment,
};
