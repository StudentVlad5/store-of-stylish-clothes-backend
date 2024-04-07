const { ValidationError } = require("../../helpers");
const { Shop_ru } = require("../../models");

const getDiscountShop_ru = async (req, res, next) => {
  try {
    const shop = await Shop_ru.find().sort({ discount_ua: -1 }).limit(20);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getDiscountShop_ru;
