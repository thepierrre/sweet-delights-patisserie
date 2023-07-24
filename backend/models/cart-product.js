const mongoose = require("mongoose");

const cartProduct = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  cart: { type: mongoose.Types.ObjectId, ref: "Cart" },
});

module.exports = mongoose.model("CartProduct", cartProduct);
