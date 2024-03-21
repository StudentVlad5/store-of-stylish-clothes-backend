const { Shop } = require('../../models');

const getShopById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const shop = await Shop.find({ article: id });
    res.status(200).json(shop);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getShopById;
