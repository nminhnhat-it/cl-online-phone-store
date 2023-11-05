const utils = require("../utils")
const apiError = require("../utils/error.utils")
const serieModel = require("../models/serie.model");
const brandModel = require("../models/brand.model");
const productModel = require("../models/product.model");

class SerieService {

  async getAll() {
    var series = await serieModel.find();
    return series;
  }

  async get(payload) {
    var brand = await brandModel.findOne({
      br_slug: payload.br_slug
    })

    var serie = await serieModel.findOne({
      sr_slug: payload.sr_slug,
      br_id: brand._id,
    });

    return serie;
  }

  async create(payload) {
    var sr_slug = utils.toSlug(payload.sr_title);

    var serie = new serieModel({
      sr_title: payload.sr_title,
      sr_slug: sr_slug,
      br_id: payload.br_id,
    });

    await serie.save();
    return serie;
  }

  async deleteAll(payload) {
    var result = await serieModel.deleteMany({
      br_id: payload.br_id
    });
    return result;
  }

  async delete(payload) {
    var id = payload.id;
    var products = await productModel.find({ sr_id: id });
    if (products != [])
      var result = await serieModel.findByIdAndDelete(id);
    return result;
  }

  async update(payload) {
    var serie = await serieModel.findById(payload.id);

    serie.sr_title = payload.sr_title;
    serie.sr_slug = utils.toSlug(payload.sr_title);
    serie.br_id = payload.br_id;

    await serie.save();
    return serie;
  }
}

module.exports = new SerieService;