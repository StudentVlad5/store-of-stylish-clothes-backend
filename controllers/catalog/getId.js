const { Catalog } = require('../../models');

const getCatalogById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const plant = await Catalog.findById({ _id: id });
    res.status(200).json(plant);
  } catch (error) {
    throw new WrongIdError(error.message);
  }
};

module.exports = getCatalogById;
