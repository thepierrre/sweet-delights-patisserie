// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// const User = require("../models/user");
// const HttpError = require("../models/http-error");

// const logInUser = async (req, res, next) => {
//   const { email, password } = req.body;

//   //   const oneWeek = 1000 * 60 * 60 * 24 * 7;

//   //   const sessionToken = uuidv4();

//   let storedEmail, storedPassword, storedName;
//   let user;
//   try {
//     user = await User.findOne({ email: email }).exec();
//     storedEmail = user.email;
//     storedPassword = user.password;
//     storedName = user.name;
//   } catch (err) {
//     const error = new HttpError("Invalid e-mail address.", 401);
//     return next(error);
//   }

//   if (email === storedEmail && password === storedPassword) {
//     res.json({ user: user.toObject() });
//   } else {
//     res.send("Invalid password.");
//   }
// };

// module.exports = {
//   logInUser,
// };

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

  const sessionId = uuidv4();
  req.session.sessionId = sessionId;

  // const oneWeek = 1000 * 60 * 60 * 24 * 7;
  // res.cookie("sessionId", sessionId, {
  //   maxAge: oneWeek,
  //   httpOnly: true,
  // });

  res.json({ user: user.toObject() });
};

module.exports = {
  logInUser,
};
