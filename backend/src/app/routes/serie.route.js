const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const serie = require("../controllers/serie.controller");

// define routes
router.route("/")
  .post(middlewares.verifyToken, middlewares.verifyPermission, serie.create)

router.route("/all/:br_slug")
  .get(serie.getAll)

router.route("/all/:br_id")
  .delete(middlewares.verifyToken, middlewares.verifyPermission, serie.deleteAll)

router.route("/:br_slug/:sr_slug")
  .get(serie.get)

router.route("/:id")
  .put(middlewares.verifyToken, middlewares.verifyPermission, serie.update)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, serie.delete)

module.exports = router;