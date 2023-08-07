const User = require("../models/user");
const HttpError = require("../models/http-error");

const getSession = async (req, res, next) => {
  const sessionId = req.params.sessionId;

  if (!sessionId) {
    return res.status(401).json({ message: "User session not found." });
  }

  try {
    const user = await User.findOne({ sessionId }).exec();

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    res.json({ user: user.toObject() });
  } catch (err) {
    console.error("Error checking session:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getSession,
};
