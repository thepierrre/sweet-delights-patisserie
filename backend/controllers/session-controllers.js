// const mongoose = require("mongoose");
// const User = require("../models/user");
// const HttpError = require("../models/http-error");

// // const getSession = (req, res, next) => {};

// const getSession = (req, res, next) => {};

// module.exports = {
//   getSession,
// };

const User = require("../models/user");
const HttpError = require("../models/http-error");

const getSession = async (req, res, next) => {
  const sessionId = req.params.sessionId;

  // Check if the session ID exists in the cookie
  if (!sessionId) {
    return res.status(401).json({ message: "User session not found." });
  }

  try {
    // Replace 'User' with your actual Mongoose model for the users collection
    const user = await User.findOne({ sessionId }).exec();

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Send the user data back to the frontend
    res.json({ user: user.toObject() });
  } catch (err) {
    console.error("Error checking session:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getSession,
};
