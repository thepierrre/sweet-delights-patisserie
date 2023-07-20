const express = require("express");
const router = express.Router();

const productsControllers = require("../controllers/products-controllers");

router.get("/:categoryName", productsControllers.getProductsByCategoryName);
router.post("/", productsControllers.createProduct);
router.delete("/:productId", productsControllers.deleteProduct);

module.exports = router;
