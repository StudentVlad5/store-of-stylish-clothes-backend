const { ValidationError } = require("../../helpers");
const { Catalog } = require("../../models");

const get = async (req, res, next) => {
  try {
    const catalog = await Catalog.find();
    res.status(200).json(catalog);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
