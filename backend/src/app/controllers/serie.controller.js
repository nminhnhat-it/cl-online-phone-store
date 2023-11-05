const utils = require("../utils")
const apiError = require("../utils/error.utils");
const service = require("../services/serie.service");

module.exports = {

  async getAll(req, res, next) {
    try {
      var series = await service.getAll();
      return res.send(series);
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    var payload = req.params;

    try {
      var serie = await service.get(payload);
      return res.send(serie);
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    var payload = req.body;

    try {
      var serie = await service.create(payload);
      return res.send("Added serie");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
    }
  },

  async deleteAll(req, res, next) {
    var payload = req.params;

    try {
      var result = await service.deleteAll(payload);
      if (result)
        return res.send("Deleted all serie");
      return next(new apiError(404, "Delete all serie failed"));
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;

    try {
      var serie = await service.delete(payload);
      if (serie)
        return res.send("Deleted serie");
      return next(new apiError(404, "Can't delete serie"));
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;

    try {
      var serie = await service.update(payload);
      return res.send("Updated serie infomations");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(new apiError(404, "Serie is not found"));
    }
  },
}