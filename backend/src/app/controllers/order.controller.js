const utils = require("../utils")
const apiError = require("../utils/error.utils");
const service = require("../services/order.service");
const orderService = require("../services/order.service");

module.exports = {

  async create(req, res, next) {
    var payload = req.body;
    payload.id = res.payload.id;

    try {
      var result = await service.create(payload);
      if (result)
        return res.send("Created order");
      return next(new apiError(404, "Cart not found"));
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      var orders = await service.getAll();
      return res.send(orders);
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;

    try {
      var orders = await service.get(payload);
      return res.send(orders);
    } catch (error) {
      return next(error);
    }
  },

  async deleteAll(req, res, next) {
    try {
      await orderService.deleteAll();
      return res.send("Deleted all orders");
    } catch (error) {
      return next(error)
    }
  },

  async update(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;
    payload.s_id = res.payload.id;

    try {
      var result = await service.update(payload);
      if (!result)
        return next(new apiError(404, "Error when update order infomations"));
      return res.send("Updated order infomations");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(error);
    }
  },

  async getAllByUserId(req, res, next) {
    var payload = res.payload;

    try {
      var orders = await service.getAllByUserId(payload);
      return res.send(orders);
    } catch (error) {
      return next(error);
    }
  },

  async cancelByUserId(req, res, next) {
    var payload = res.payload;
    payload.od_id = req.params.id;

    try {
      var orders = await service.cancelByUserId(payload);
      return res.send("Cancel success");
    } catch (error) {
      return next(error);
    }
  },
}