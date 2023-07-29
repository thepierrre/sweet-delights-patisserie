const express = require("express");
const router = express.Router();

const productsControllers = require("../controllers/products-controllers");

router.get(
  "/category/:categoryName",
  productsControllers.getProductsByCategoryName
);
router.post("/", productsControllers.createProduct);
router.get("/product/:productId", productsControllers.getProductById);
router.get("/recommended", productsControllers.getRecommendedProducts);
router.delete("/:productId", productsControllers.deleteProduct);
router.patch("/:productId", productsControllers.editProduct);

module.exports = router;
