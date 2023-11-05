const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    maxLength: [255, "Email is too long"],
    minLength: [2, "Email is too short"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxLength: [255, "Password is too long"],
    minLength: [8, "Password is too short"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [255, "Name is too long"],
    minLength: [3, "Name is too short"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    maxLength: [1024, "Address is too long"],
    minLength: [3, "Address is too short"],
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);