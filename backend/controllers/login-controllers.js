const session = require("express-session");

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

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

  if (!user || user.password !== password) {
    res.send("Invalid email or password.");
    return;
  }

  console.log(req.session);

  // req.session.cookie = user.id;

  res.json({ user: user.toObject() });
};

module.exports = {
  logInUser,
};
