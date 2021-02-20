//* Import the server
const server = require("./api/server");

//* Specify port to use
const PORT = 5000;

//* Start server
server.listen(PORT, () => {
  console.log(`\n=== Server started at http://localhost:${PORT} ===\n`);
});
