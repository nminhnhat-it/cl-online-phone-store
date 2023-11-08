const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productVersionSchema = new Schema({
  pv_img: {
    type: String,
    // required: [true, "Image is required"],
    maxLength: [1024, "Image is too long"],
  },
  pv_title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: [1024, "Title is too long"],
  },
  pv_price: {
    type: Number,
    required: [true, "Price is required"],
  },
  pv_quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  pd_id: {
    type: mongoose.ObjectId,
    required: [true, "Product is required"],
  },
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Product_Version', productVersionSchema);