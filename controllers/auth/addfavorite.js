const { dataFilter, userMainField } = require("../../helpers");
const { Users } = require("../../models");

const addFavorite = async (req, res, next) => {
  const { user, params } = req;
  const ddd = await Users.updateOne(
    { _id: user._id },
    { $addToSet: { favorites: params.id } }
  );
  const resUpdate = await Users.findOne({ _id: user._id });
  const newResponse = dataFilter(resUpdate, userMainField);
  res.status(201).json(newResponse);
};

module.exports = addFavorite;
