const { ValidationError } = require("../../helpers");
const { Shop_ua } = require("../../models");

const getDiscountShop_ua = async (req, res, next) => {
  try {
    const shop = await Shop_ua.find().sort({ discount_ua: -1 }).limit(20);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getDiscountShop_ua;
