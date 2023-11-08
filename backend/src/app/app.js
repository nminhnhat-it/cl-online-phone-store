const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ origin: 'http://localhost:3001' })).use(express.json()).use(cookieParser());

// require routes
app.use("/api/", require("./routes"));

app.use("/public/uploads", express.static('public/uploads'));

module.exports = app;