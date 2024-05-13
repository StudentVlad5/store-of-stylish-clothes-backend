const { ValidationError } = require("../../helpers");
const { ReadyStyles } = require("../../models");

const getReadyStyles = async (req, res, next) => {
  try {   
    const shop = await ReadyStyles.find();
    // const shop = await ReadyStyles.find().limit(12);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getReadyStyles;
