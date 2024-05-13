const { ValidationError } = require("../../helpers");
const { Category} = require("../../models");

const get = async (req, res, next) => {
  try {
    const categoryFilters = await Category.find();
    res.status(200).json(categoryFilters);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
