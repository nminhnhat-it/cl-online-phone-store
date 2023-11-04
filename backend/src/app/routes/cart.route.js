const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

// require controllers
const cart = require("../controllers/cart.controller");

// define routes
router.route("/")
  .post(middlewares.verifyToken, cart.create)
  .get(middlewares.verifyToken, middlewares.verifyPermission, cart.getAll)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, cart.deleteAll)

router.route("/infos")
  .get(middlewares.verifyToken, cart.getByUserid)
  .delete(middlewares.verifyToken, cart.deleteByUserId)
  .post(middlewares.verifyToken, cart.addCartInfoByUserId)

router.route("/infos/:id")
  .delete(middlewares.verifyToken, cart.deleteCartInfoById)
  .put(middlewares.verifyToken, cart.updateCartInfoById)

router.route("/:id")
  .get(middlewares.verifyToken, middlewares.verifyPermission, cart.get)
  .put(middlewares.verifyToken, middlewares.verifyPermission, cart.update)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, cart.delete)


module.exports = router;