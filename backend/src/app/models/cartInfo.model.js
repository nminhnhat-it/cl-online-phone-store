const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartInfoSchema = new Schema({
  pv_id: {
    type: mongoose.ObjectId,
    required: [true, "Product is required"],
  },
  c_id: {
    type: mongoose.ObjectId,
    required: [true, "Cart is required"],
  },
  ci_quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  ci_price: {
    type: Number,
    required: [true, "Price is required"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Cart_Info', cartInfoSchema);