const { ValidationError } = require("../../helpers");
const { Category } = require("../../models");

const get = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
