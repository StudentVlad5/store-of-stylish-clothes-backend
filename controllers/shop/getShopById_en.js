const { Shop_en } = require('../../models');

const getShopById_en = async (req, res, next) => {
  const id = req.params.id;
  try {
    const shop = await Shop_en.find({ article: id });
    res.status(200).json(shop);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getShopById_en;
