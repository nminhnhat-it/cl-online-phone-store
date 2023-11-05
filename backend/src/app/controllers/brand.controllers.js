const utils = require("../utils")
const apiError = require("../utils/error.utils");
const service = require("../services/brand.service");

module.exports = {

  async getAll(req, res, next) {
    try {
      var brands = await service.getAll();
      return res.send(brands);
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    var payload = req.params;

    try {
      var brand = await service.get(payload);
      return res.send(brand);
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    var payload = req.body;

    try {
      var brand = await service.create(payload);
      return res.send("Added brand");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
    }
  },

  async deleteAll(req, res, next) {
    try {
      var result = await service.deleteAll();
      if (result)
        return res.send("Deleted all brand");
      return next(new apiError(404, "Delete all brand failed"));
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;

    try {
      var result = await service.delete(payload);
      if (result)
        return res.send("Deleted brand");
      return next(new apiError(404, "Can't delete brand"));
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;

    try {
      var brand = await service.update(payload);
      return res.send("Updated brand infomations");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(new apiError(404, "Brand is not found"));
    }
  },
}