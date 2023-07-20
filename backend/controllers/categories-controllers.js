const Category = require("../models/category");
const HttpError = require("../models/http-error");

const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const createdCategory = new Category({
    name,
  });

  try {
    await createdCategory.save();
  } catch (err) {
    const error = new HttpError("Could not add a new category.", 500);
    return next(error);
  }

  res.status(201).json({ category: createdCategory.toObject() });
};

module.exports = {
  createCategory,
};
