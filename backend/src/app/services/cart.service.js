const utils = require("../utils")
const apiError = require("../utils/error.utils")
const productVersionModel = require("../models/productVersion.model");

class CartService {

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

  async get(payload) {
    var slug = payload.slug;
    var product = await productModel.findOne({
      pd_slug: slug,
    });

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
      pi_screen: payload.productInfo.pi_screen,
      pi_camera: payload.productInfo.pi_camera,
      pi_batterry: payload.productInfo.pi_batterry,
      pi_mem: payload.productInfo.pi_mem,
      pi_ram: payload.productInfo.pi_ram,
      pi_chipset: payload.productInfo.pi_chipset,
    })

    var product = new productModel({
      pd_title: payload.pd_title,
      pd_decs: payload.pd_decs,
      pd_slug: utils.toSlug(payload.pd_title),
      pi_id: productInfo._id,
      sr_id: payload.sr_id
    })
    var error = product.validateSync();
    if (error) return error;

    var productImageArr = [];
    var productImages = payload.productImages;
    for (const image of productImages) {
      var productImage = new productImageModel({
        im_link: image.im_link,
        pd_id: product._id,
      })
      var error = productImage.validateSync();
      if (error) return error;
      productImageArr.push(productImage);
    }

    var productVersionArr = []
    var productVersions = payload.productVersions;
    for (const version of productVersions) {
      var productVersion = new productVersionModel({
        pv_img: version.pv_img,
        pv_title: version.pv_title,
        pv_price: version.pv_price,
        pv_quantity: version.pv_quantity,
        pd_id: product._id
      })
      var error = productVersion.validateSync();
      if (error) return error;
      productVersionArr.push(productVersion);
    }

    for (const productImage of productImageArr) {
      await productImage.save();
    }
    for (const productVersion of productVersionArr) {
      await productVersion.save();
      if (product.pd_minPrice > productVersion.pv_price || product.pd_minPrice == 0)
        product.pd_minPrice = productVersion.pv_price;
    }
    await product.save();
    await productInfo.save();
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
    product.pd_decs = payload.pd_decs;
    product.pd_slug = utils.toSlug(payload.pd_title);
    product.sr_id = payload.sr_id;

    var error = product.validateSync();
    if (error) return error;

    var productInfo = await productInfoModel.findById(product.pi_id);
    productInfo.pi_screen = payload.productInfo.pi_screen;
    productInfo.pi_camera = payload.productInfo.pi_camera;
    productInfo.pi_batterry = payload.productInfo.pi_batterry;
    productInfo.pi_mem = payload.productInfo.pi_mem;
    productInfo.pi_ram = payload.productInfo.pi_ram;
    productInfo.pi_chipset = payload.productInfo.pi_chipset;

    var delProductImages = await productImageModel.find({
      pd_id: product._id
    })
    var productImageArr = [];
    var productImages = payload.productImages;
    for (const image of productImages) {
      var productImage = new productImageModel({
        im_link: image.im_link,
        pd_id: product._id,
      })
      var error = productImage.validateSync();
      if (error) return error;
      productImageArr.push(productImage);
    }

    var delProductVersions = await productVersionModel.find({
      pd_id: product._id
    })
    var productVersionArr = []
    var productVersions = payload.productVersions;
    for (const version of productVersions) {
      var productVersion = new productVersionModel({
        pv_img: version.pv_img,
        pv_title: version.pv_title,
        pv_price: version.pv_price,
        pv_quantity: version.pv_quantity,
        pd_id: product._id
      })
      var error = productVersion.validateSync();
      if (error) return error;
      productVersionArr.push(productVersion);
    }

    for (const productImage of productImageArr) {
      await productImage.save();
    }
    for (const productImage of delProductImages) {
      await productImageModel.findByIdAndDelete(productImage._id);
    }

    for (const productVersion of productVersionArr) {
      await productVersion.save();
      if (product.pd_minPrice > productVersion.pv_price || product.pd_minPrice == 0)
        product.pd_minPrice = productVersion.pv_price;
    }
    for (const productVersion of delProductVersions) {
      await productVersionModel.findByIdAndDelete(productVersion._id);
    }

    await product.save();
    await productInfo.save();
  }
}

module.exports = new CartService;