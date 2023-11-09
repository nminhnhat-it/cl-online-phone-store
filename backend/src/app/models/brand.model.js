const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  br_title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [255, "Title is too long"],
  },
  br_desc: {
    type: String,
    maxLength: [3048, "Decription is too long"],
  },
  br_slug: {
    type: String,
    required: [true, "Slug is required"],
    maxLength: [255, "Slug is too long"],
  },
  br_img: {
    type: String,
    maxLength: [1024, "Image is too long"],
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Brand', brandSchema);