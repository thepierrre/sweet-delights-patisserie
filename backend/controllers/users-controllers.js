const mongoose = require("mongoose");

const User = require("../models/user");
const HttpError = require("../models/http-error");

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const createdUser = new User({
    name,
    email,
    password,
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
