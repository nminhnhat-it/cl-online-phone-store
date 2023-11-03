const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productInfoSchema = new Schema({
  pi_screen: {
    type: Number,
  },
  pi_camera: {
    type: String,
    maxLength: [255, "Camera is too long"],
    minLength: [1, "Camera is too short"],
  },
  pi_batterry: {
    type: Number,
  },
  pi_mem: {
    type: Number,
  },
  pi_ram: {
    type: Number,
  },
  pi_chipset: {
    type: String,
    maxLength: [1024, "Chipset is too long"],
    minLength: [1, "Chipset is too short"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Product_Info', productInfoSchema);