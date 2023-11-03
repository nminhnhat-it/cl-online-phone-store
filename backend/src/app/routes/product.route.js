const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const product = require("../controllers/product.controller");

// define routes
router.route("/")
  .post(middlewares.verifyToken, middlewares.verifyPermission, product.create)
  .get(product.getAll)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, product.deleteAll)

router.route("/:slug")
  .get(product.get)

router.route("/:id")
  .put(middlewares.verifyToken, middlewares.verifyPermission, product.update)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, product.delete)

module.exports = router;