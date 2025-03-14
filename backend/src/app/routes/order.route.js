const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const order = require("../controllers/order.controller");

// define routes
router.route("/")
  .post(middlewares.verifyToken, order.create)
  .get(middlewares.verifyToken, middlewares.verifyPermission, order.getAll)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, order.deleteAll)

router.route("/customer")
.get(middlewares.verifyToken, order.getAllByUserId)

router.route("/customer/:id")
  .put(middlewares.verifyToken, order.cancelByUserId)

router.route("/:id")
  .get(middlewares.verifyToken, middlewares.verifyPermission, order.get)
  .put(middlewares.verifyToken, middlewares.verifyPermission, order.update)

module.exports = router;