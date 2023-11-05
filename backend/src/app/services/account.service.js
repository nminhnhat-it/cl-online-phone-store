const customerModel = require("../models/customer.model");
const staffModel = require("../models/staff.model");

class AccountService {

  async getAll() {

  }

  async get(payload) {
    var id = payload.id;
    var customer = await customerModel.findById(id);
    if (customer)
      return customer;
    var staff = await staffModel.findById(id);
    return staff;
  }

  async create(payload) {
    var customer = new customerModel({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      address: payload.address,
      phone: payload.phone,
    });

    await customer.save();
    return customer;
  }

  async deleteAll() {
  }

  async delete(payload) {
    var id = payload.id;
    var customer = await customerModel.findByIdAndDelete(id);
    return customer;
  }

  async update(payload) {
  }

  async login(payload) {
    var customer = await customerModel.findOne({
      email: payload.email,
      password: payload.password,
    }).then(customer => {
      return customer;
    });

    var staff = await staffModel.findOne({
      email: payload.email,
      password: payload.password,
    }).then(staff => {
      return staff;
    });

    if (customer) return customer;
    if (staff) return staff;
  }
}

module.exports = new AccountService;