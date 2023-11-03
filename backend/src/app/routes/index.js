const express = require("express");
const router = express.Router();

const apiError = require("../utils/error.utils");

// require routes
const accountRoutes = require("./account.route");
const brandRoutes = require("./brand.route");
const serieRoutes = require("./serie.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");

// use routes
router.use("/accounts", accountRoutes);
router.use("/brands", brandRoutes);
router.use("/series", serieRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);

router.use((req, res, next) => {
  return next(new apiError(404, "Resource not found"));
});

router.use(require("../middlewares").errorHandler);

module.exports = router;