const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const serie = require("../controllers/serie.controller");

// define routes
router.route("/")
  .get(serie.getAll)
  .post(middlewares.verifyToken, middlewares.verifyPermission, serie.create)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, serie.deleteAll)

router.route("/:id")
  .put(middlewares.verifyToken, middlewares.verifyPermission, serie.update)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, serie.delete)

router.route("/:br_slug/:sr_slug")
  .get(serie.get)


module.exports = router;