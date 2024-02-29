const { ValidationError } = require("../../helpers");
const { Basket } = require("../../models");

const removeItemInBasket = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const size = req.body.size;
    const id = req.body._id;
    const checkItem = await Basket.find({ _id });

    let newOptionData = [];
    if (checkItem[0]?._id) {
      checkItem[0].optionData.map((item) => {
        if (item.title !== size || item._id !== id) {
          newOptionData.push(item);
        }
      });

      await Basket.findOneAndDelete({ _id });
      newData = {
        _id,
        optionData: newOptionData,
      };
    }
    resCreate = await Basket.create(newData);
    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = removeItemInBasket;
