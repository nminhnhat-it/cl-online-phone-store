const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  od_status: {
    type: String,
    default: "await",
    enum: {
      values: ['await', 'prepare','ship','complete','cancel'],
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
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);