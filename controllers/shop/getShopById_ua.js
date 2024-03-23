const { Shop_ua } = require('../../models');

const getShopById_ua = async (req, res, next) => {
  const id = req.params.id;
  try {
    const shop = await Shop_ua.find({ article: id });
    res.status(200).json(shop);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getShopById_ua;
