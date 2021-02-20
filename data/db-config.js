//* Import knex and config file
const knex = require("knex");
const config = require("../knexfile");

//* Specify environment
const environment = process.env.NODE_ENV || "development";

//* Setup configured knex
const configuredKnex = knex(config[environment]);

//* Export config
module.exports = configuredKnex;
