const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashPassword = async (passwd) => {
    try {
      const saltRounds = 10;
      passwd = password;
      const hashedPassword = await bcrypt.hash(passwd, saltRounds);
      return hashedPassword;
    } catch (err) {
      const error = new HttpError("Couldn't hash the password.", 500);
      return next(error);
    }
  };

  let hashedPassword;

  try {
    hashedPassword = await hashPassword(password);
  } catch (err) {
    return next(err);
  }

  const createdUser = new User({
    name,
    email,
    hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Couldn't register a new user.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject() });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError("Couldn't get the list of users.", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject()) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    await User.deleteOne({ _id: userId });
  } catch (err) {
    const error = new HttpError("Could not delete the user account.", 500);
    return next(error);
  }

  res.status(200).json({ message: "The user account has been deleted." });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
};
