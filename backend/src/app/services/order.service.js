const utils = require("../utils")
const cartModel = require("../models/cart.model");
const product = require("../models/product.model");
const productVersion = require("../models/productVersion.model");
const cartInfoModel = require("../models/cartInfo.model");
const orderModel = require("../models/orders.model");
const customerModel = require("../models/customer.model");
const staffModel = require("../models/staff.model");
const productVersionModel = require("../models/productVersion.model");
const productModel = require("../models/product.model");

class OrderService {

  async create(payload) {
    var cart = await cartModel.findOne({
      ctm_id: payload.id,
      c_isOrder: false
    })

    var cartInfos = await cartInfoModel.find({
      c_id: cart._id
    })

    for (const cartInfo of cartInfos) {
      var productVersion = await productVersionModel.findById(cartInfo.pv_id);

      productVersion.pv_quantity -= cartInfo.ci_quantity
      await productVersion.save();
    }

    if (cart) {
      var od_total = cart.c_total - cart.c_reduce;
      var order = new orderModel({
        od_total: od_total,
        c_id: cart._id,
        od_name: payload.name,
        od_email: payload.email,
        od_phone: payload.phone,
        od_address: payload.address,
      })

      await order.save();

      cart.c_isOrder = true;
      await cart.save()

      var newCart = new cartModel({
        ctm_id: payload.id,
      })
      newCart.save();
    }
    return order;
  }

  async getAll() {
    var orders = await orderModel.find();
    var orderArr = [];
    for (var order of orders) {
      var cart = await cartModel.findById(order.c_id);
      var customer = await customerModel.findById(cart.ctm_id);
      var staff = await staffModel.findById(order.s_id);
      order = {
        ...order._doc,
        customer: customer,
        cart: cart,
        staff: staff
      }

      orderArr.push(order);
    }

    return orderArr;
  }

  async getAllByUserId(payload) {
    var carts = await cartModel.find({
      ctm_id: payload.id,
      c_isOrder: true
    }).sort({ createdAt: -1 });

    if (carts) {
      var orderArr = [];
      for (var cart of carts) {
        var order = await orderModel.findOne({
          c_id: cart._id,
        });
        if (order) {
          var cartInfos = await cartInfoModel.find({
            c_id: cart._id,
          })

          var cartInfoArr = [];
          for (var cartInfo of cartInfos) {
            var productVersion = await productVersionModel.findById(cartInfo.pv_id)
            var product = await productModel.findById(productVersion.pd_id)
            cartInfo = {
              ...cartInfo._doc,
              productVersion: productVersion,
              product: product
            }

            cartInfoArr.push(cartInfo);
          }

          order = {
            ...order._doc,
            cart: cart,
            cartInfos: cartInfoArr,
          }

          orderArr.push(order);
        }
      }
    }
    return orderArr;
  }

  async get(payload) {
    var order = await orderModel.findById(payload.id);
    var cart = await cartModel.findById(order.c_id);
    var customer = await customerModel.findById(cart.ctm_id);
    var staff = await staffModel.findById(order.s_id)

    var cartInfoArr = []
    var cartInfos = await cartInfoModel.find({
      c_id: cart._id
    })

    for (var cartInfo of cartInfos) {
      var productVersion = await productVersionModel.findById(cartInfo.pv_id);
      var product = await productModel.findById(productVersion.pd_id);
      cartInfo = {
        ...cartInfo._doc,
        productVersion: productVersion,
        product: product
      }

      cartInfoArr.push(cartInfo);
    }

    order = {
      ...order._doc,
      customer: customer,
      cart: cart,
      staff: staff,
      cartInfos: cartInfoArr
    }

    return order;
  }

  async deleteAll() {
    await orderModel.deleteMany();
  }

  async update(payload) {
    var order;
    if (payload.od_status)
      var order = await orderModel.findById(payload.id);

    if (order) {
      if (order.od_status == payload.od_status)
        return null;
      if (order.od_status == "await")
        order.s_id = payload.s_id;
      order.od_status = payload.od_status;

      if (order.od_status == 'cancel') {
        var cart = await cartModel.findById(order.c_id);
        var cartInfos = await cartInfoModel.find({
          c_id: cart._id
        })

        for (const cartInfo of cartInfos) {
          var productVersion = await productVersionModel.findById(cartInfo.pv_id);
          productVersion.pv_quantity += cartInfo.ci_quantity;
          productVersion.save();
        }
      }

      await order.save();
    }
    return order;
  }

  async cancelByUserId(payload) {
    var order = await orderModel.findById(payload.od_id);
    order.od_status = "cancel";

    var cart = await cartModel.findById(order.c_id);
    var cartInfos = await cartInfoModel.find({
      c_id: cart._id
    })

    for (const cartInfo of cartInfos) {
      var productVersion = await productVersionModel.findById(cartInfo.pv_id);
      productVersion.pv_quantity += cartInfo.ci_quantity;
      productVersion.save();
    }
    await order.save();
  }
}

module.exports = new OrderService;