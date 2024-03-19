const { Catalog } = require('../../models');

const getCatalogById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const catalog = await Catalog.find();
    res.status(200).json(catalog);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getCatalogById;
