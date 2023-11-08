const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, './public/uploads/');
  },
  filename: function (req, file, cd) {
    cd(null, new Date().toISOString() + file.originalname)
  }
})
const upload = multer({ storage: storage })

// require controllers
const product = require("../controllers/product.controller");

// define routes
router.route("/")
  .get(product.getAll)
  .post(middlewares.verifyToken, middlewares.verifyPermission, upload.array('productImages', 12), product.create)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, product.deleteAll)

router.route("/:slug")
  .get(product.get)

router.route("/:id")
  .put(middlewares.verifyToken, middlewares.verifyPermission, product.update)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, product.delete)

router.route("/image")
  .post(middlewares.verifyToken, middlewares.verifyPermission, upload.array('productImages', 12), product.addImage)

router.route("/image/:id")
  .delete(middlewares.verifyToken, middlewares.verifyPermission, product.deleteImage)

router.route("/version")
  .post(middlewares.verifyToken, middlewares.verifyPermission, upload.array('productImages', 1), product.addVersion)

router.route("/version/:id")
  .get(product.getVersion)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, product.deleteVersion)
  .put(middlewares.verifyToken, middlewares.verifyPermission, upload.array('productImages', 1), product.updateVersion)

module.exports = router;