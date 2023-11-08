const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productInfoSchema = new Schema({
  pi_screen: {
    type: Number,
  },
  pi_camera: {
    type: String,
  },
  pi_battery: {
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
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Product_Info', productInfoSchema);