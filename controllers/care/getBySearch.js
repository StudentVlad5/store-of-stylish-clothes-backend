const { Care } = require('../../models');

const getBySearch = async (req, res, next) => {
  try {
    const search = req.query;
    console.log(filter);
    const care  = await Catalog.find({
      name: { $regex: search },
    });
    res.status(200).json(care);

  } catch (error) {
    res.status(400).json({ message: 'Invalid filters characters' });
  }
};

module.exports = getBySearch;
