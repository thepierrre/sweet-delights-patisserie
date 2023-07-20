const express = require("express");

const router = express.Router();

const categoriesControllers = require("../controllers/categories-controllers");

router.post("/", categoriesControllers.createCategory);

module.exports = router;
