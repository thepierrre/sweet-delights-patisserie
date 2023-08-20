const express = require("express");

const router = express.Router();

const cartControllers = require("../controllers/cart-controllers");

router.post("/", cartControllers.createCart);
router.get("/", cartControllers.getCartByUserId);

module.exports = router;
