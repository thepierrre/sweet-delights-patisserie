const express = require("express");
const router = express.Router();

const sessionControllers = require("../controllers/session-controllers");

router.get("/", sessionControllers.getSession);

module.exports = router;
