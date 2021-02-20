//* Import express and setup server
const express = require("express");
const server = express();

//* Ensure the server is able to parse JSON
server.use(express.json());

//* Export the server
module.exports = server;
