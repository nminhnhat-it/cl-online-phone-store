const apiError = require("../utils/error.utils")
const userModel = require("../models/user.model");
const staffModel = require("../models/staff.model");

class AccountService {

  async getAll() {

  }

  async get(payload) {
    var id = payload.id;
    var user = await userModel.findById(id);
    if (user)
      return user;
    var staff = await staffModel.findById(id);
    return staff;
  }

  async create(payload) {
    var user = new userModel({
      us_name: payload.us_name,
      us_email: payload.us_email,
      us_password: payload.us_password,
      us_address: payload.us_address,
      us_phone: payload.us_phone,
    });

    await user.save();
    return user;
  }

  async deleteAll() {
  }

  async delete(payload) {
    var id = payload.id;
    var user = await userModel.findByIdAndDelete(id);
    return user;
  }

  async update(payload) {
  }

  async login(payload) {
    var user = await userModel.findOne({
      us_email: payload.us_email,
      us_password: payload.us_password,
    }).then(user => {
      return user;
    });

    var staff = await staffModel.findOne({
      s_email: payload.s_email,
      s_password: payload.s_password,
    }).then(staff => {
      return staff;
    });

    if (user) return user;
    if (staff) return staff;
  }
}

module.exports = new AccountService;