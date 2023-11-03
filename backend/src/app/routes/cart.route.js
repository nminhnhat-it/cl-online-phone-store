const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const cart = require("../controllers/cart.controller");

// define routes
router.route("/")
  .post(cart.create)
  .get(cart.getAll)
  .delete(cart.deleteAll)

router.route("/:slug")
  .get(cart.get)

router.route("/:id")
  .put(cart.update)
  .delete(cart.delete)

module.exports = router;