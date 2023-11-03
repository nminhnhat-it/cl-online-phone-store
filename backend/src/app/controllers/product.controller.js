const utils = require("../utils")
const apiError = require("../utils/error.utils");
const service = require("../services/product.service");

module.exports = {

  async getAll(req, res, next) {
    try {
      var products = await service.getAll();
      return res.send(products);
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    var payload = req.params;
    try {
      var product = await service.get(payload);
      if (product)
        return res.send(product);
      return next(new apiError(404, "Product is not found"));
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    var payload = req.body;

    try {
      var error = await service.create(payload);
      if (error) {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return res.send("Added product");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(error)
    }
  },

  async deleteAll(req, res, next) {
    try {
      var result = await service.deleteAll();
      if (result)
        return res.send("Deleted all product");
      return next(new apiError(404, "Delete all product failed"));
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
        return res.send("Deleted product");
      return next(new apiError(404, "product is not found"));
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;

    try {
      var error = await service.update(payload);
      if (error) {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return res.send("Updated product infomations");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(error);
    }
  },
}