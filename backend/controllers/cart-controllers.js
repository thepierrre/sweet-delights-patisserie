const mongoose = require("mongoose");

const User = require("../models/user");
const Cart = require("../models/cart");
const CartProduct = require("../models/cart-product");
const HttpError = require("../models/http-error");

const getCartByUserId = async (req, res, next) => {
  const { userId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  let cart;

  try {
    cart = await Cart.findOne({
      user: user,
    });
  } catch (err) {
    // const error = new HttpError("Fetching the user's cart failed.", 500);
    console.log(err);
    return next(err);
  }

  res.json({ cart: cart.toObject() });
};

const createCart = async (req, res, next) => {
  const { user, items } = req.body;

  let currUser;
  try {
    currUser = await User.findById(user);
  } catch (err) {
    const error = new HttpError("Couldn't find the user.", 500);
    return next(error);
  }

  if (!currUser) {
    const error = new HttpError("User doesn't exist.", 401);
    return next(error);
  }

  let cart;
  try {
    cart = await Cart.findOne({ user: currUser._id });
  } catch (err) {
    const error = new HttpError("Error fetching the user's cart.", 500);
    return next(error);
  }

  if (!cart) {
    cart = new Cart({
      user: currUser._id,
      cartProducts: [],
    });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    for (const item of items) {
      const { name, price, amount, _id } = item;

      const newCartProduct = new CartProduct({
        _id,
        name,
        price,
        amount,
        cart: cart._id,
      });
      cart.cartProducts.push(newCartProduct);
      await newCartProduct.save({ session: sess });
    }

    await cart.save({ session: sess });
    currUser.cart = cart._id;
    await currUser.save({ session: sess });
    await sess.commitTransaction();

    res.status(201).json({
      cart: cart.toObject(),
    });
  } catch (err) {
    // const error = new HttpError("Could not add a new cart to the user.", 500);
    console.log(err);
    return next(err);
  }
};

module.exports = {
  createCart,
  getCartByUserId,
};

// for (const item of items) {
//     const { name, price, amount } = item;

//     if (item.name) {
//       const existingCartItem = cart.cartProducts.find(
//         (cartItem) => cartItem.name === name
//       );
//       if (existingCartItem) {
//         existingCartItem.amount += amount;
//       } else {
//         const newCartProduct = new CartProduct({
//           name,
//           price,
//           amount,
//           cart: cart._id,
//         });
//         cart.cartProducts.push(newCartProduct);
//         await newCartProduct.save({ session: sess });
//       }
//     }
