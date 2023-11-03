const utils = require("../utils")
const apiError = require("../utils/error.utils");
const service = require("../services/account.service");

module.exports = {

  async getAll(req, res, next) {
  },

  async get(req, res, next) {
    var payload = res.payload;

    try {
      var data = await service.get(payload);
      return res.send(data);
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    var payload = req.body;

    try {
      var user = await service.create(payload);
      return next();
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
    }
  },

  async deleteAll(req, res, next) {
  },

  async delete(req, res, next) {
    var payload = res.payload;

    try {
      var user = await service.delete(payload);
      if (user)
        return res.send("Deleted account");

      return next(new apiError(404, "Account is not found"));
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
  },

  async login(req, res, next) {
    var payload = req.body;

    try {
      var result = await service.login(payload);
      if (!result)
        return next(new apiError(401, "Credentials are missing or wrong"));
      res.payload = result;
      return next();
    } catch (error) {
      return next(error);
    }
  },
}