const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  pd_title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [1024, "Title is too long"],
    minLength: [1, "Title is too short"],
  },
  pd_decs: {
    type: String,
    maxLength: [3048, "Title is too long"],
    minLength: [1, "Title is too short"],
  },
  pd_slug: {
    type: String,
    required: [true, "Slug is required"],
    maxLength: [1024, "Slug is too long"],
    minLength: [1, "Slug is too short"],
  },
  pd_minPrice: {
    type: Number,
    default: 0,
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