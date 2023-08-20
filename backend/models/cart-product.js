const mongoose = require("mongoose");

const cartProduct = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  // _id: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  _id: { type: mongoose.Types.ObjectId, ref: "Product" },
  cart: { type: mongoose.Types.ObjectId, ref: "Cart" },
});

module.exports = mongoose.model("CartProduct", cartProduct);
