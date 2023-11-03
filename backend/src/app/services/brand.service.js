const utils = require("../utils")
const brandModel = require("../models/brand.model");
const apiError = require("../utils/error.utils")

class BrandService {

  async getAll() {
    var brands = await brandModel.find();
    return brands;
  }

  async get(payload) {
    var slug = payload.slug;

    var brand = await brandModel.findOne({
      br_slug: slug,
    });

    return brand;
  }

  async create(payload) {
    var br_slug = utils.toSlug(payload.br_title);

    var brand = new brandModel({
      br_title: payload.br_title,
      br_desc: payload.br_desc,
      br_slug: br_slug,
    });

    await brand.save();
    return brand;
  }

  async deleteAll() {
    var result = await brandModel.deleteMany();
    return result;
  }

  async delete(payload) {
    var id = payload.id;
    var user = await brandModel.findByIdAndDelete(id);
    return user;
  }

  async update(payload) {
    var brand = await brandModel.findById(payload.id);

    brand.br_title = payload.br_title;
    brand.br_desc = payload.br_desc;
    brand.br_slug = utils.toSlug(payload.br_title);

    await brand.save();
    return brand;
  }
}

module.exports = new BrandService;