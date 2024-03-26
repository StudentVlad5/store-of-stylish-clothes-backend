const { Shop_ru } = require('../../models');

const getShopById_ru = async (req, res, next) => {
  const id = req.params.id;
  try {
    const shop = await Shop_ru.find({ article: id });
    res.status(200).json(shop);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getShopById_ru;
