const { ValidationError } = require("../../helpers");
const { Care } = require("../../models");

const get = async (req, res, next) => {
  try {
    const care = await Care.find();
    res.status(200).json(care);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
