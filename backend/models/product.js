const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photoUrl: { type: String, required: true },
  description: { type: String, required: true },
  isRecommended: { type: Boolean, required: true },
  category: { type: mongoose.Types.ObjectId, required: true, ref: "Category" },
});

module.exports = mongoose.model("Product", productSchema);
