const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  us_email: {
    type: String,
    required: [true, "Email is required"],
    maxLength: [255, "Email is too long"],
    minLength: [2, "Email is too short"],
  },
  us_password: {
    type: String,
    required: [true, "Password is required"],
    maxLength: [255, "Password is too long"],
    minLength: [8, "Password is too short"],
  },
  us_name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [255, "Name is too long"],
    minLength: [3, "Name is too short"],
  },
  us_address: {
    type: String,
    required: [true, "Address is required"],
    maxLength: [1024, "Address is too long"],
    minLength: [3, "Address is too short"],
  },
  us_phone: {
    type: Number,
    required: [true, "Phone is required"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);