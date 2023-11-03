const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  br_title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [255, "Title is too long"],
    minLength: [2, "Title is too short"],
  },
  br_desc: {
    type: String,
    maxLength: [3048, "Decription is too long"],
    minLength: [8, "Decription is too short"],
  },
  br_slug: {
    type: String,
    required: [true, "Slug is required"],
    maxLength: [255, "Slug is too long"],
    minLength: [3, "Slug is too short"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Brand', brandSchema);