const { ValidationError } = require("../../helpers");
const { Shop_en } = require("../../models");

const getDiscountShop_en = async (req, res, next) => {
  try {
    const shop = await Shop_en.find().sort({ discount_ua: -1 }).limit(20);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getDiscountShop_en;
