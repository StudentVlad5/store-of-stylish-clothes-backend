const { ValidationError } = require("../../helpers");
const { Messages } = require("../../models");


const create = async (req, res, next) => {
  try {
    const fullData = { ...req.body };
    const resCreate = await Messages.create(fullData);
    return res.status(201).json(resCreate);
    }
   catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = create;
