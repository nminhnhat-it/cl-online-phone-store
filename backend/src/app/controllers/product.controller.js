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

  async getVersion(req, res, next) {
    var payload = req.params;

    try {
      var version = await service.getVersion(payload);
      if (version)
        return res.send(version);
      return next(new apiError(404, "Color is not found"));
    } catch (error) {
      return next(error);
    }
  },

  async create(req, res, next) {
    var payload = req.body;
    payload.productImages = req.files;

    try {
      var error = await service.create(payload);
      if (error) {
        utils.deleteImage(payload.productImages)
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return res.send("Added product");
    } catch (error) {
      if (error.name == "ValidationError") {
        utils.deleteImage(payload.productImages)
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      utils.deleteImage(payload.productImages)
      return next(error)
    }
  },

  async addImage(req, res, next) {
    var payload = req.body;
    payload.productImages = req.files;

    try {
      var error = await service.addImage(payload);
      if (error) {
        utils.deleteImage(payload.productImages)
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return res.send("Added image");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        utils.deleteImage(payload.productImages)
        return next(new apiError(422, error));
      }
      utils.deleteImage(payload.productImages)
      return next(error)
    }
  },

  async deleteImage(req, res, next) {
    payload = req.params;

    try {
      var error = await service.deleteImage(payload);
      return res.send("Deleted image");
    } catch (error) {
      if (error.name == "ValidationError") {
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      return next(error)
    }
  },

  async deleteVersion(req, res, next) {
    payload = req.params;

    try {
      var error = await service.deleteVersion(payload);
      return res.send("Deleted color");
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

  async addVersion(req, res, next) {
    var payload = req.body;
    payload.productImages = req.files;

    try {
      var error = await service.addVersion(payload);
      if (error) {
        utils.deleteImage(payload.productImages)
        return next(new apiError(422, error));
      }
      return res.send("Added version");
    } catch (error) {
      if (error.name == "ValidationError") {
        utils.deleteImage(payload.productImages)
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      utils.deleteImage(payload.productImages)
      return next(error)
    }
  },

  async updateVersion(req, res, next) {
    var payload = req.body;
    payload.id = req.params.id;
    payload.productImages = req.files;

    try {
      var error = await service.updateVersion(payload);
      if (error) {
        utils.deleteImage(payload.productImages)
        return next(new apiError(422, error));
      }
      return res.send("Added version");
    } catch (error) {
      if (error.name == "ValidationError") {
        utils.deleteImage(payload.productImages)
        error = utils.parseValidateError(error);
        return next(new apiError(422, error));
      }
      utils.deleteImage(payload.productImages)
      return next(error)
    }
  }

}