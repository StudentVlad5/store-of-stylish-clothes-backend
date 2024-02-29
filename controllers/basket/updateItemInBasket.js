const { ValidationError } = require("../../helpers");
const { Basket } = require("../../models");

const updateItemInBasket = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const newData = { ...req.body, _id};
    await Basket.deleteMany({ _id });
    resCreate = await Basket.create(newData);
    return res.status(201).json([resCreate]);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateItemInBasket;
