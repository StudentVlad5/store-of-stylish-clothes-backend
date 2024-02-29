const { ValidationError } = require("../../helpers");
const { Basket } = require("../../models");

const addItemInBasket = async (req, res, next) => {
  try {
    let resCreate;
    const fullData = { ...req.body };
    const checkItem = await Basket.find({ _id: fullData._id });
    let status = true;
    let newData = '';
    if (checkItem[0]?._id) {
      checkItem[0].optionData.find((item) => {
        if (
          item.title === fullData.optionData[0].title &&
          item._id === fullData.optionData[0]._id
        ) {
          item.quantity = item.quantity + fullData.optionData[0].quantity;
          status = false;
        }
      });
      if (status) {
        checkItem[0].optionData.push(fullData.optionData[0]);
      }
      await Basket.findOneAndDelete({ _id: checkItem[0]._id });
      newData = {
        _id: checkItem[0]._id,
        optionData: [...checkItem[0].optionData],
      };
    }
    !checkItem[0]?._id
      ? (resCreate = await Basket.create(fullData))
      : (resCreate = await Basket.create(newData));

    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = addItemInBasket;
