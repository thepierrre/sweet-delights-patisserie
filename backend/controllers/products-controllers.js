const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Product = require("../models/product");
const Category = require("../models/category");

const createProduct = async (req, res, next) => {
  const { name, price, description, category, photoUrl, isRecommended } =
    req.body;

  if (!name || !price || !description || !category || !photoUrl) {
    const error = new HttpError("Please fill in all the fields.", 400);
    return next(error);
  }

  let categoryObj;
  try {
    categoryObj = await Category.findOne({ name: category }).exec();
  } catch (err) {
    console.log(err);
  }

  const createdProduct = new Product({
    name,
    price,
    description,
    category: categoryObj._id,
    photoUrl,
    isRecommended,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    categoryObj.products.push(createdProduct);
    await categoryObj.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not add a new product.", 500);
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
};

const editProduct = async (req, res, next) => {
  const { name, price, description, photoUrl, category, isRecommended } =
    req.body;
  const productId = req.params.productId;

  let categoryObj;
  try {
    categoryObj = await Category.findOne({ name: category }).exec();
    if (!categoryObj) {
      const error = new HttpError("Category not found.", 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Could not find the category.", 500);
    return next(error);
  }

  let product;
  try {
    product = await Product.findById(productId).populate("category");
  } catch (err) {
    const error = new HttpError("Could not find the product.", 500);
    return next(error);
  }

  const filter = { _id: productId };
  const update = {
    name,
    price,
    description,
    photoUrl,
    category: categoryObj._id,
    isRecommended,
  };

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Product.findOneAndUpdate(filter, update).session(sess);
    await product.category.save();
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not edit the product.", 500);
    console.log(err);
    return next(error);
  }

  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError("Could not find the edited product.", 500);
    console.log(err);
    return next(error);
  }

  res.status(200).json({ product: product.toObject() });
};

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

const getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  let product, category;
  try {
    product = await Product.findById(productId);
    category = product.category;
    category = await Category.findById(category);
    category = category.name;
  } catch (err) {
    const error = new HttpError("Fetching the product failed.", 500);
    return next(error);
  }

  res.json({ product: product.toObject(), category: category });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    await Product.deleteOne({ _id: productId });
  } catch (err) {
    const error = new HttpError("Could not delete the product.", 500);
    return next(error);
  }

  res.status(200).json({ message: "The product has been deleted." });
};

const getRecommendedProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({ isRecommended: true });
  } catch (err) {
    const error = new HttpError(
      "Could not fetch the recommended products.",
      500
    );
    return next(error);
  }

  res.json({ products: products.map((product) => product.toObject()) });
};

module.exports = {
  createProduct,
  getProductsByCategoryName,
  getProductById,
  deleteProduct,
  editProduct,
  getRecommendedProducts,
};
