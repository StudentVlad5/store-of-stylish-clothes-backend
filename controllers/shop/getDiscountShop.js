const { ValidationError } = require("../../helpers");
const { Shop } = require("../../models");

const getDiscountShop = async (req, res, next) => {
  try {
    const shop = await Shop.find().sort({ discount_ua: -1 }).limit(20);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getDiscountShop;
