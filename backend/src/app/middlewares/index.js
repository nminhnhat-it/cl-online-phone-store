const config = require("../../config");
const apiError = require("../utils/error.utils")

const jwt = require("jsonwebtoken");

// require models
const staffModel = require("../models/staff.model");

module.exports = {

  errorHandler: (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    })
  },

  generateToken: (req, res, next) => {
    var payload = res.payload
    var token = jwt.sign({
      id: payload._id,
    }, config.auth.key, {
      expiresIn: config.auth.expire
    });
    res.cookie("token", token, { expires: new Date(Date.now() + 24 * 3600000) })
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
          id: data.id,
        }
        return next();
      }
    } catch (error) {
      res.clearCookie('token');
      return next(new apiError(403, "You need to login"));
    }
  },

  verifyPermission: async (req, res, next) => {
    try {
      var staff = await staffModel.findById(res.payload.id);
      if (staff)
        return next();
      return next(new apiError(403, "Access forbiden"));
    } catch (error) {
      return next(error);
    }
  },

  clearToken: async (req, res, next) => {
    res.clearCookie('token');
    return res.send("Clear token");
  }
}