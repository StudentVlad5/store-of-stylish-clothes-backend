const { ValidationError } = require("../../helpers");
const { Basket } = require("../../models");

const getById = async (req, res, next) => {
  const _id = req.params.id;
  try {
    let basketItems = [];
    if(_id !== ''){basketItems = await Basket.find({ _id })};
    res.status(200).json(basketItems);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getById;
