const utils = require("../utils")
const apiError = require("../utils/error.utils")
const productModel = require("../models/product.model");
const productImageModel = require("../models/productImage.model");
const productInfoModel = require("../models/productInfo.model");
const productVersionModel = require("../models/productVersion.model");

class ProductService {

  async getAll() {
    var productsArray = await productModel.find();

    var products = [];
    for (var product of productsArray) {
      var payload = {
        slug: product.pd_slug
      };

      product = await this.get(payload);
      products.push(product);
    }

    return products;
  }

  async getVersion(payload) {
    var id = payload.id;
    var productVersion = await productVersionModel.findById(id);
    return productVersion;
  }

  async get(payload) {
    var slug = payload.slug;
    var product = await productModel.findOne({ pd_slug: slug });

    if (product) {
      var productInfo = await productInfoModel.findById(product.pi_id);

      var productVersions = await productVersionModel.find({
        pd_id: product._id
      })

      var productImages = await productImageModel.find({
        pd_id: product._id
      })

      product = {
        ...product._doc,
        productInfo: productInfo,
        productVersions: productVersions,
        productImages: productImages
      }
    }

    return product;
  }

  async create(payload) {
    var productInfo = new productInfoModel({
      pi_screen: payload.pi_screen,
      pi_camera: payload.pi_camera,
      pi_battery: payload.pi_battery,
      pi_mem: payload.pi_mem,
      pi_ram: payload.pi_ram,
      pi_chipset: payload.pi_chipset,
    })

    var product = new productModel({
      pd_title: payload.pd_title,
      pd_desc: payload.pd_desc,
      pd_slug: utils.toSlug(payload.pd_title),
      pi_id: productInfo._id,
      sr_id: payload.sr_id
    })
    var error = product.validateSync();
    if (error) return error;

    var productImageArr = [];
    var productImages = payload.productImages;
    var index = 0;
    for (const image of productImages) {
      if (index++) {
        var productImage = new productImageModel({
          im_path: image.path,
          pd_id: product._id,
        })
        var error = productImage.validateSync();
        if (error) return error;
        productImageArr.push(productImage);
      }
    }

    var productVersion = new productVersionModel({
      pv_img: payload.productImages[0].path,
      pv_title: payload.pv_title,
      pv_price: payload.pv_price,
      pv_quantity: payload.pv_quantity,
      pd_id: product._id
    })
    var error = productVersion.validateSync();
    if (error) return error;

    for (const productImage of productImageArr) {
      await productImage.save();
    }

    await productVersion.save();
    if (product.pd_minPrice > productVersion.pv_price || product.pd_minPrice == 0)
      product.pd_minPrice = productVersion.pv_price;

    await product.save();
    await productInfo.save();
  }

  async addImage(payload) {
    var productImageArr = [];
    var productImages = payload.productImages;
    for (const image of productImages) {
      var productImage = new productImageModel({
        im_path: image.path,
        pd_id: payload.id,
      })
      var error = productImage.validateSync();
      if (error) return error;
      productImageArr.push(productImage);
    }

    for (const productImage of productImageArr) {
      await productImage.save();
    }
  }

  async deleteImage(payload) {
    var id = payload.id;
    var productImage = await productImageModel.findById(id);
    var fs = require('fs');
    var filePath = './' + productImage.im_path;
    fs.unlinkSync(filePath);
    await productImageModel.findByIdAndDelete(id);
  }

  async deleteVersion(payload) {
    var id = payload.id;
    var productVersion = await productVersionModel.findById(id);
    var fs = require('fs');
    var filePath = './' + productVersion.pv_img;
    fs.unlinkSync(filePath);
    await productVersionModel.findByIdAndDelete(id);
  }

  async deleteAll() {
    var result = await productInfoModel.deleteMany();
    if (result)
      var result = await productVersionModel.deleteMany();
    if (result)
      var result = await productModel.deleteMany();
    return result;
  }

  async delete(payload) {
    var id = payload.id;
    var product = await productModel.findById(id);
    var productImages = await productImageModel.find({
      pd_id: id
    })
    var fs = require('fs');
    for (const image of productImages) {
      var filePath = './' + image.im_path;
      fs.unlinkSync(filePath);
    }

    var productVersions = await productVersionModel.find({
      pd_id: id
    })
    var fs = require('fs');
    for (const image of productVersions) {
      var filePath = './' + image.pv_img;
      fs.unlinkSync(filePath);
    }

    await productInfoModel.findByIdAndDelete(product.pi_id);
    await productVersionModel.deleteMany({
      pd_id: id
    })
    await productImageModel.deleteMany({
      pd_id: id
    })
    var result = await productModel.findByIdAndDelete(id);
    return result;
  }

  async update(payload) {
    var product = await productModel.findById(payload.id);
    product.pd_title = payload.pd_title;
    product.pd_desc = payload.pd_desc;
    product.pd_slug = utils.toSlug(payload.pd_title);
    product.sr_id = payload.sr_id;

    var error = product.validateSync();
    if (error) return error;

    var productInfo = await productInfoModel.findById(product.pi_id);
    productInfo.pi_screen = payload.pi_screen;
    productInfo.pi_camera = payload.pi_camera;
    productInfo.pi_battery = payload.pi_battery;
    productInfo.pi_mem = payload.pi_mem;
    productInfo.pi_ram = payload.pi_ram;
    productInfo.pi_chipset = payload.pi_chipset;

    await product.save();
    await productInfo.save();
  }

  async addVersion(payload) {
    var product = await productModel.findById(payload.id);
    var productVersion = new productVersionModel({
      pv_img: payload.productImages[0].path,
      pv_title: payload.pv_title,
      pv_price: payload.pv_price,
      pv_quantity: payload.pv_quantity,
      pd_id: payload.id
    })
    var error = productVersion.validateSync();
    if (error) return error;

    await productVersion.save();

    if (product.pd_minPrice > productVersion.pv_price || product.pd_minPrice == 0)
      product.pd_minPrice = productVersion.pv_price;
  }

  async updateVersion(payload) {
    var productVersion = await productVersionModel.findById(payload.id);
    var product = await productModel.findById(productVersion.pd_id);

    var oldImg = productVersion.pv_img;

    if (payload.productImages[0])
      productVersion.pv_img = payload.productImages[0].path;

    productVersion.pv_title = payload.pv_title;
    productVersion.pv_price = payload.pv_price;
    productVersion.pv_quantity = payload.pv_quantity;

    await productVersion.save();
    if (product.pd_minPrice > productVersion.pv_price || product.pd_minPrice == 0)
      product.pd_minPrice = productVersion.pv_price;

    if (payload.productImages[0]) {
      var fs = require('fs');
      var filePath = './' + oldImg;
      fs.unlinkSync(filePath);
    }
  }
}

module.exports = new ProductService;