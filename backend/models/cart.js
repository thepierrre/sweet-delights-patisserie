const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  cartProducts: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "CartProduct",
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
