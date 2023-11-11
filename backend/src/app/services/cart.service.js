const utils = require("../utils")
const apiError = require("../utils/error.utils")
const productVersionModel = require("../models/productVersion.model");
const productModel = require("../models/product.model");
const cartModel = require("../models/cart.model");
const cartInfoModel = require("../models/cartInfo.model");

class CartService {

  async getAll() {
    var carts = await cartModel.find();

    var cartArr = []
    for (var cart of carts) {
      var cartInfos = await cartInfoModel.find({
        c_id: cart._id
      })

      cart = {
        ...cart._doc,
        cartInfos: cartInfos
      }
      cartArr.push(cart);
    }

    return cartArr;
  }

  async get(payload) {
    var cart = await cartModel.findById(payload.id);
    if (cart) {
      var cartInfos = await cartInfoModel.find({
        c_id: cart._id,
      });

      cart = {
        ...cart._doc,
        cartInfos: cartInfos
      }
    }
    return cart;
  }

  async create(payload) {
    var cartExit = await cartModel.findOne({
      ctm_id: payload.id,
      c_isOrder: false,
    })
    if (cartExit)
      return null;

    var cart = new cartModel({
      ctm_id: payload.id,
    })

    cart.save();
    return cart;
  }

  async deleteAll() {
    var result = await cartInfoModel.deleteMany();
    if (result)
      var result = await cartModel.deleteMany();
    return result;
  }

  async delete(payload) {
    await cartInfoModel.deleteMany({
      c_id: payload.id
    })
    var result = await cartModel.findByIdAndDelete(payload.id);
    return result;
  }

  async update(payload) {
    var cart = await cartModel.findById(payload.id);
    cart.c_total = payload.c_total;
    cart.c_reduce = payload.c_reduce;
    cart.c_isOrder = payload.c_isOrder;

    cart.save();
  }

  async getByUserid(payload) {
    var cart = await cartModel.findOne({
      ctm_id: payload.id,
      c_isOrder: false
    })

    if (cart) {
      var cartInfoArr = [];
      var cartInfos = await cartInfoModel.find({
        c_id: cart._id,
      });

      for (var cartInfo of cartInfos) {
        var productVersion = await productVersionModel.findById(cartInfo.pv_id);
        var product = await productModel.findById(productVersion.pd_id);

        cartInfo = {
          ...cartInfo._doc,
          product: product,
          productVersion: productVersion
        }
        cartInfoArr.push(cartInfo);
      }

      cart = {
        ...cart._doc,
        cartInfos: cartInfoArr
      }
    }
    return cart;
  }

  async deleteByUserId(payload) {
    var cart = await cartModel.findOne({
      ctm_id: payload.id,
      c_isOrder: false
    })

    var cartInfo = await cartInfoModel.deleteMany({
      c_id: cart._id
    })

    return cartInfo;
  }

  async addCartInfoByUserId(payload) {
    var cart = await cartModel.findOne({
      ctm_id: payload.id,
      c_isOrder: false
    })

    
    if (cart) {
      var productVersion = await productVersionModel.findById(payload.pv_id);
      var ci_price = productVersion.pv_price * payload.ci_quantity;

      var cartInfo = new cartInfoModel({
        pv_id: payload.pv_id,
        c_id: cart._id,
        ci_quantity: payload.ci_quantity,
        ci_price: ci_price,
      });

      await cartInfo.save();
      cart.c_total += ci_price;
      await cart.save();
    }
  }

  async deleteCartInfoById(payload) {
    var cartInfo = await cartInfoModel.findByIdAndDelete(payload.ci_id);
    if (cartInfo) {
      var cart = await cartModel.findOne({
        ctm_id: payload.id,
        c_isOrder: false
      })

      cart.c_total -= cartInfo.ci_price;
      await cart.save();
    }
    return cartInfo;
  }

  async updateCartInfoById(payload) {
    var productVersion = await productVersionModel.findById(payload.pv_id);
    var ci_price = productVersion.pv_price * payload.ci_quantity;

    var cartInfo = await cartInfoModel.findById(payload.ci_id);
    cartInfo.ci_quantity += payload.ci_quantity;
    cartInfo.ci_price += ci_price;

    cartInfo.save();

    var cart = await cartModel.findOne({
      ctm_id: payload.id,
      c_isOrder: false
    })

    cart.c_total += ci_price;
    await cart.save();
  }

  async updateCartInfoByCartId(payload) {
    var productVersion = await productVersionModel.findById(payload.pv_id);
    var ci_price = productVersion.pv_price * payload.ci_quantity;

    var cartInfo = await cartInfoModel.findById(payload.ci_id);

    var ci_pricebf = cartInfo.ci_price;
    cartInfo.ci_quantity = payload.ci_quantity;
    cartInfo.ci_price = ci_price;

    cartInfo.save();

    var cart = await cartModel.findOne({
      ctm_id: payload.id,
      c_isOrder: false
    })

    cart.c_total = cart.c_total - ci_pricebf + ci_price;
    await cart.save();
  }
}

module.exports = new CartService;