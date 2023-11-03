const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  c_total: {
    type: Number,
    default: 0,
  },
  c_reduce: {
    type: Number,
    default: 0,
  },
  c_isOrder: {
    type: Boolean,
    default: false,
  },
  us_id: {
    type: mongoose.ObjectId,
    required: [true, "User is required"],
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);