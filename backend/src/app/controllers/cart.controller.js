const utils = require("../utils")
const apiError = require("../utils/error.utils");
const service = require("../services/cart.service");

module.exports = {

  async getAll(req, res, next) {
    try {
      var carts = await service.getAll();
      return res.send(carts);
    } catch (error) {
      console.log(error)
      return next(error);
    }
  },

  async get(req, res, next) {
    var payload = req.params;
    
    try {
      var cart = await service.get(payload);
      if (cart)
        return res.send(cart);
      return next(new apiError(404, "Cart is not found"));
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    var payload = res.payload;

    try {
      var result = await service.create(payload);
      if (!result)
        return next(new apiError(404, "Cart exit"));
      return res.send("Added cart");
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
        return res.send("Deleted all cart");
      return next(new apiError(404, "Delete all cart failed"));
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    payload.id = req.params.id;

    try {
      var result = await service.delete(payload);
      if (result)
        return res.send("Deleted cart");
      return next(new apiError(404, "Cart is not found"));
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
      return res.send("Updated cart infomations");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(error);
    }
  },

  async getByUserid(req, res, next) {
    var payload = res.payload

    try {
      var cart = await service.getByUserid(payload);
      if (cart)
        return res.send(cart);
      return next(new apiError(404, "Cart is not found"));
    } catch (error) {
      return next(error);
    }
  },

  async deleteByUserId(req, res, next) {
    payload.id = res.params.id;

    try {
      var result = await service.deleteByUserId(payload);
      if (result)
        return res.send("Deleted cart");
      return next(new apiError(404, "Cart is not found"));
    } catch (error) {
      return next(error);
    }
  },

  async addCartInfoByUserId(req, res, next) {
    var payload = req.body;
    payload.id = res.payload.id;

    try {
      await service.addCartInfoByUserId(payload);
      return res.send("Added cart infos");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(error)
    }
  },

  async deleteCartInfoById(req, res, next) {
    var payload = res.payload;
    payload.ci_id = req.params.id;

    try {
      var result = await service.deleteCartInfoById(payload);
      if (result)
        return res.send("Deleted cart info");
      return next(new apiError(404, "Cart info is not found"));
    } catch (error) {
      return next
    }
  },

  async updateCartInfoById(req, res, next) {
    var payload = req.body;
    payload.id = res.payload.id;

    try {
      var error = await service.updateCartInfoById(payload);
      if (error) {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return res.send("Updated cart infomations");
    } catch (error) {
      return next(error);
    }
  },

  async updateCartInfoByCartId(req, res, next) {
    var payload = req.body;
    payload.id = res.payload.id;
    payload.ci_id = req.params.id;

    try {
      var error = await service.updateCartInfoByCartId(payload);
      if (error) {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return res.send("Updated cart infomations");
    } catch (error) {
      return next(error);
    }
  }
}