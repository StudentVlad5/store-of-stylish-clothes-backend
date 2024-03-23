const { Shop_de } = require('../../models');

const getShopById_de = async (req, res, next) => {
  const id = req.params.id;
  try {
    const shop = await Shop_de.find({ article: id });
    res.status(200).json(shop);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getShopById_de;
