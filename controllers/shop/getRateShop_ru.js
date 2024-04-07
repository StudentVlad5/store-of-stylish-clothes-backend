const { ValidationError } = require("../../helpers");
const { Shop_ru } = require("../../models");

const getRateShop_ru = async (req, res, next) => {
  try {
    const shop = await Shop_ru.find().sort({ rate: -1 }).limit(20);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getRateShop_ru;
