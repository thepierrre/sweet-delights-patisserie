const express = require("express");
const router = express.Router();

const loginControllers = require("../controllers/login-controllers");

router.post("/", loginControllers.logInUser);

module.exports = router;
