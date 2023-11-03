const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImageSchema = new Schema({
  im_link: {
    type: String,
    required: [true, "Image is required"],
    maxLength: [1024, "Image is too long"],
    minLength: [2, "Image is too short"],
  },
  pd_id: {
    type: mongoose.ObjectId,
    required: [true, "Product is required"],
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Product_Image', productImageSchema);