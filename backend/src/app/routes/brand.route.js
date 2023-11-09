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
const brand = require("../controllers/brand.controllers");

// define routes
router.route("/")
  .get(brand.getAll)
  .post(middlewares.verifyToken, middlewares.verifyPermission, upload.array('brandImage', 1), brand.create)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, brand.deleteAll)

router.route("/:slug")
  .get(brand.get)

router.route("/:id")
  .put(middlewares.verifyToken, middlewares.verifyPermission, upload.array('brandImage', 1), brand.update)
  .delete(middlewares.verifyToken, middlewares.verifyPermission, brand.delete)

module.exports = router;