const mongoose = require("mongoose");

const User = require("../models/user");
const Cart = require("../models/cart");
const CartProduct = require("../models/cart-product");
const HttpError = require("../models/http-error");

const getCartByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findById(user.cart).populate("cartProducts");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    res.json({ cart: cart.toObject() });
  } catch (err) {
    return next(new HttpError("Couldn't get the user.", 500));
  }
};

const clearCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("User doesn't exist.", 404));
    }
    await Cart.findOneAndUpdate(
      { _id: user.cart },
      { $set: { cartProducts: [] } },
      { new: true }
    );
  } catch (err) {
    return next(new HttpError("Couldn't clear the cart.", 500));
  }

  res.status(200).json({ message: "Cart cleared successfully." });
};

const deleteCartItem = async (req, res, next) => {
  const { userId, itemId } = req.params;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("User doesn't exist.", 404));
    }
  } catch (err) {
    console.log(err);
  }

  let itemToDelete;
  try {
    itemToDelete = await CartProduct.findById(itemId).populate("cart");
  } catch (err) {
    return next(new HttpError("Couldn't delete the cart item.", 500));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await CartProduct.deleteOne({ _id: itemId }).session(sess);
    itemToDelete.cart.cartProducts.pull(itemToDelete);
    await itemToDelete.cart.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ message: "The item has been deleted from the cart." });
};

const updateCart = async (req, res, next) => {
  const { items } = req.body;
  const { userId } = req.params;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("User doesn't exist.", 404));
    }

    let cart = await Cart.findById(user.cart).populate("cartProducts");
    if (!cart) {
      return next(new HttpError("User's cart doesn't exist.", 404));
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();

    for (const item of items) {
      const { id, name, price, amount } = item;

      const existingCartProduct = await CartProduct.findById(id);

      if (existingCartProduct) {
        existingCartProduct.name = name;
        existingCartProduct.price = price;
        existingCartProduct.amount = amount;

        await existingCartProduct.save({ session: sess });
      } else {
        const newCartProduct = new CartProduct({
          _id: id,
          name,
          price,
          amount,
          cart: cart._id,
        });
        cart.cartProducts.push(newCartProduct);
        await newCartProduct.save({ session: sess });
      }
    }

    await cart.save({ session: sess });
    user.cart = cart._id;
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.status(201).json({
      cart: cart.toObject(),
    });
  } catch (err) {
    console.error(err);
    return next(new HttpError("Error updating the cart.", 500));
  }
};

module.exports = {
  getCartByUserId,
  updateCart,
  deleteCartItem,
  clearCart,
};
