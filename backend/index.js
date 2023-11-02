require("dotenv").config();

const app = require("./app/app");
const config = require("./config");
const db = require("./app/utils/mongodb.utils");

function startServer() {
    db.connect();

    const port = config.app.port;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}

startServer();