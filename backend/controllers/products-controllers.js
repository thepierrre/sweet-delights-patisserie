const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Product = require("../models/product");
const Category = require("../models/category");

const getProductsByCategoryName = async (req, res, next) => {
  const categoryName = req.params.categoryName;

  let categoryWithProducts;
  try {
    categoryWithProducts = await Category.findOne({
      name: categoryName,
    }).populate("products");
  } catch (err) {
    const error = new HttpError("Fetching products failed.", 500);
    return next(error);
  }

  res.json({ categoryWithProducts: categoryWithProducts.toObject() });
};

const createProduct = async (req, res, next) => {
  const { name, price, description, category, photoUrl, creator } = req.body;

  let categoryObj;
  try {
    categoryObj = await Category.findOne({ name: category }).exec();
  } catch (err) {}

  const createdProduct = new Product({
    name,
    price,
    description,
    category: categoryObj._id,
    photoUrl,
    creator,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    categoryObj.products.push(createdProduct);
    await categoryObj.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not add a new product.", 500);
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

const deleteProduct = (req, res, next) => {};

module.exports = {
  createProduct,
  getProductsByCategoryName,
  deleteProduct,
};
