const { CitiesNP } = require("../../models");

const postByFilter = async (req, res, next) => {
  const filter = req.body.filter;
  if (filter) {
    try {
      const cities = await CitiesNP.find({
        Description: { $regex: `${filter}`, $options: "i" },
      });
      res.status(200).json(cities);
    } catch (error) {
      res.status(400).json({ message: "Invalid filters characters" });
    }
  }
};

module.exports = postByFilter;
