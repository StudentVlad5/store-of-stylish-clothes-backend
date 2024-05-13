const { Shop, ReadyStyles } = require('../../models');

const getShopById = async (req, res, next) => {
  const id = req.params.id;
  try {
    let shop = await Shop.find({ article: id });
    if(!shop || shop.length === 0 ){shop = await ReadyStyles.find({ article: id });}
    res.status(200).json(shop);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getShopById;
