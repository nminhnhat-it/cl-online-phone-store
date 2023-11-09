const utils = require("../utils")
const brandModel = require("../models/brand.model");
const apiError = require("../utils/error.utils");
const serieModel = require("../models/serie.model");

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
      br_img: payload.brandImage[0].path
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
    var series = await serieModel.find({ br_id: id })
    if (!series[0]) {
      var result = await brandModel.findByIdAndDelete(id);
      var fs = require('fs');
      var filePath = './' + result.br_img;
      fs.unlinkSync(filePath);
    }
    return result;
  }

  async update(payload) {
    var brand = await brandModel.findById(payload.id);

    brand.br_title = payload.br_title;
    brand.br_desc = payload.br_desc;
    brand.br_slug = utils.toSlug(payload.br_title);
    if (payload.brandImage[0]) {
      var fs = require('fs');
      var filePath = './' + brand.br_img;
      fs.unlinkSync(filePath);
      brand.br_img = payload.brandImage[0].path;
    }

    await brand.save();
    return brand;
  }
}

module.exports = new BrandService;