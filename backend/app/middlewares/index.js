const config = require("../../config");
const apiError = require("../utils/error.utils")

const jwt = require("jsonwebtoken");

// require models
const userModel = require("../models/user.model");

module.exports = {

  errorHandler: (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    })
  },

  generateToken: (req, res, next) => {
    var payload = res.payload
    var token = jwt.sign({
      _id: payload._id
    }, config.auth.key, {
      expiresIn: config.auth.expire
    });

    return res.json({
      token: token
    });
  },

  verifyToken: (req, res, next) => {
    try {
      var token = req.cookies.token;
      var data = jwt.verify(token, config.auth.key);
      if (data) {
        res.payload = {
          _id: data._id,
          role: data.role
        }
        return next();
      }
    } catch (error) {
      return next(new apiError(403, "You need login"));
    }
    next();
  },

   verifyPermission:async (req, res, next) => {
    try {
      var userData = await userModel.findById(res.payload._id);
      var role = userData.role;
  
      if(role != config.auth.role.ad)
        return next();
      return next(new apiError(403,"Access forbidden"));
    } catch (error) {
      return next(error);
    }
  }
}