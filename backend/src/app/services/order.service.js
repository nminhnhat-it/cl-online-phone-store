const utils = require("../utils")
const cartModel = require("../models/cart.model");
const ordersModel = require("../models/orders.model");

class OrderService {

  async create(payload) {
    var cart = await cartModel.findOne({
      us_id: payload.id,
      c_isOrder: false
    })

    if (cart) {
      var od_total = cart.c_total - cart.c_reduce;
      var order = new ordersModel({
        od_total: od_total,
        c_id: cart._id,
      })
      await order.save();

      cart.c_isOrder = true;
      await cart.save()
    }
    return order;
  }

  async getAll() {
    var orders = await ordersModel.find();
    return orders;
  }

  async deleteAll() {
    await ordersModel.deleteMany();
  }

  async update(payload) {
    var order;
    if (payload.od_status)
      var order = await ordersModel.findById(payload.id);

    if (order) {
      if (order.od_status == payload.od_status)
        return null;
      if (order.od_status == "await")
        order.s_id = payload.s_id;
      order.od_status = payload.od_status;

      await order.save();
    }
    return order;
  }
}

module.exports = new OrderService;