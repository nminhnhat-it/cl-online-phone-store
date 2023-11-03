const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serieSchema = new Schema({
  sr_title: {
    type: String,
    required: [true, "Tile is required"],
    maxLength: [255, "Tile is too long"],
    minLength: [1, "Tile is too short"],
  },
  sr_slug: {
    type: String,
    required: [true, "Slug is required"],
    maxLength: [255, "Slug is too long"],
    minLength: [1, "Slug is too short"],
  },
  br_id: {
    type: mongoose.ObjectId,
    required: [true, "Brand is required"],
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Serie', serieSchema);