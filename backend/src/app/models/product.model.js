const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  pd_title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [1024, "Title is too long"],
  },
  pd_desc: {
    type: String,
    maxLength: [3048, "Title is too long"],
  },
  pd_slug: {
    type: String,
    required: [true, "Slug is required"],
    maxLength: [1024, "Slug is too long"],
  },
  pd_minPrice: {
    type: Number,
    default: 0,
  },
  pd_focusImgBg: {
    type: String
  },
  pd_focusImg: {
    type: String
  },
  pd_isFocusProduct: {
    type: Boolean,
    default: false
  },
  sr_id: {
    type: mongoose.ObjectId,
    required: [true, "Series is required"],
  },
  pi_id: {
    type: mongoose.ObjectId,
    required: [true, "Product Info is required"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);