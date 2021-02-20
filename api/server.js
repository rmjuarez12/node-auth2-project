//* Import express and setup server
const express = require("express");
const server = express();

//* Ensure the server is able to parse JSON
server.use(express.json());

//* Import routers
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

//* Configure routers
server.use("/api/users", authRouter);
server.use("/api/users", usersRouter);

//* Export the server
module.exports = server;
