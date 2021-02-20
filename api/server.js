//* Import express and setup server
const express = require("express");
const server = express();

//* Ensure the server is able to parse JSON
server.use(express.json());

//* Import routers
const authRouter = require("./auth/auth-router");

//* Configure routers
server.use("/api/users", authRouter);

//* Export the server
module.exports = server;
