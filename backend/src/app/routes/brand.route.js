const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const brand = require("../controllers/brand.controllers");

// define routes
router.route("/")
  .get(brand.getAll)
  .post(middlewares.verifyToken, middlewares.verifyPermission, brand.create)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, brand.deleteAll)

router.route("/:slug")
  .get(brand.get)

router.route("/:id")
  .put(middlewares.verifyToken, middlewares.verifyPermission, brand.update)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, brand.delete)

module.exports = router;