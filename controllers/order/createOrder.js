const { ValidationError } = require("../../helpers");
const { Orders } = require("../../models");
const { Basket } = require("../../models");

const createOrder = async (req, res, next) => {
  try {
    const fullData = { ...req.body };
    console.log("fullData", fullData);
    const _id = fullData.basket._id;
    await Basket.deleteMany({ _id });
    const resCreate = await Orders.create(fullData);
    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createOrder;
