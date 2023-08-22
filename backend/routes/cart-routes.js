const express = require("express");

const router = express.Router();

const cartControllers = require("../controllers/cart-controllers");

router.get("/:userId", cartControllers.getCartByUserId);
router.put("/:userId/update", cartControllers.updateCart);
router.put("/:userId/clear", cartControllers.clearCart);
router.delete("/:userId/:itemId", cartControllers.deleteCartItem);
module.exports = router;
