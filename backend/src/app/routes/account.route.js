const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const account = require("../controllers/account.controller")

// define routes
router.route("/login")
  .post(account.login, middlewares.generateToken)

router.route("/")
  .get(middlewares.verifyToken, account.get)
  .post(account.create, account.login, middlewares.generateToken)
  .put(middlewares.verifyToken, account.update)
  .delete(middlewares.verifyToken, account.delete)

module.exports = router;