const { ValidationError } = require("../../helpers");
const { Shop } = require("../../models");

const getRateShop = async (req, res, next) => {
  try {
    const shop = await Shop.find().sort({ rate: -1 }).limit(20);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getRateShop;
