const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "Cart",
  },
  sessionId: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
