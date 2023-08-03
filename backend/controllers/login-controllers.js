const bcrypt = require("bcrypt");
const session = require("express-session");

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const logInUser = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email }).exec();
  } catch (err) {
    const error = new HttpError("Invalid e-mail address.", 401);
    return next(error);
  }

  // if (!user || user.password !== password) {
  //   const error = new HttpError("Invalid email or password.", 401);
  //   return next(error);
  // }

  if (!user) {
    const error = new HttpError("Invalid email.", 401);
    return next(error);
  }

  try {
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!isPasswordMatched || !user) {
      const error = new HttpError("Invalid password.", 401);
      return next(error);
    }
  } catch (err) {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: user._id, email: user.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.cookie("token", token, {
    expires: new Date(Date.now() + 60 * 60 * 1000), // time until expiration
    secure: false, // set to true if you're using https
    httpOnly: true,
  });
  res.status(200).json({ user: user.toObject() });
};

const me = async (req, res, next) => {
  const { token } = req.cookies;
  let decrypt;
  try {
    decrypt = jwt.verify(token, "secretkeyappearshere");
  } catch (err) {
    const error = new HttpError("Invalid jwt token.", 401);
    return next(error);
  }
  let user;
  try {
    user = await User.findOne({ _id: decrypt.userId }).exec();
  } catch (err) {
    const error = new HttpError("Invalid user id.", 401);
    return next(error);
  }

  res.status(200).json({ user: user.toObject() });
};

const logOutUser = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({});
};

module.exports = {
  logInUser,
  me,
  logOutUser,
};
