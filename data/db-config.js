//* Import knex and config file
const knex = require("knex");
const config = require("../knexfile");

//* Setup configured knex
const configuredKnex = knex(config.development);

//* Export config
module.exports = configuredKnex;
