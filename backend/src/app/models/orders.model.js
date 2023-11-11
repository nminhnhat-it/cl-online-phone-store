const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  od_status: {
    type: String,
    default: "await",
    enum: {
      values: ['await', 'prepare', 'ship', 'complete', 'cancel'],
      message: '{VALUE} is not supported'
    },
  },
  od_total: {
    type: Number,
    default: 0,
  },
  s_id: {
    type: mongoose.ObjectId,
    default: null,
  },
  c_id: {
    type: mongoose.ObjectId,
    required: [true, "Cart is required"],
  },
  od_name: {
    type: String,
    required: [true, "Name is required"],
  },
  od_phone: {
    type: Number,
    required: [true, "Phone is required"],
  },
  od_email: {
    type: String,
  },
  od_address: {
    type: String,
    required: [true, "Address is required"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);