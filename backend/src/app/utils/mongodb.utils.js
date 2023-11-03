const mongosse = require("mongoose");
const config = require("../../config");

async function connect() {
  await mongosse.connect(config.database.uri)
    .then(result => console.log("Connected mongodb"))
    .catch(error => console.log("Connect failed: ", error))
}

module.exports = {
  connect
};