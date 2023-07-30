const express = require("express");
const router = express.Router();

const loginControllers = require("../controllers/login-controllers");

router.post("/", loginControllers.logInUser);
router.get("/me", loginControllers.me);
router.get("/logout", loginControllers.logOutUser);

module.exports = router;
