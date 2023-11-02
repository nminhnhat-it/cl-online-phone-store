const express = require("express");
const router = express.Router();

const apiError = require("../utils/error.utils");

// require routes


// use routes


router.use((req, res, next) => {
  return next(new apiError(404, "Resource not found"));
});

router.use(require("../middlewares").errorHandler);

module.exports = router;