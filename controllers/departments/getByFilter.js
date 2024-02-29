const axios = require("axios");

const getByFilter = async (req, res, next) => {
  const filter = req.body.filter;

  const customHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  };

  const url =
    `https://www.ukrposhta.ua/address-classifier/get_postoffices_postdistricts_web?pdCityId=` +
    filter;

  console.log("url", url);

  if (filter) {
    try {
      axios
        .get(url, {
          headers: customHeaders,
        })
        .then((data) => {
          res.status(200).json(data.data.Entries.Entry);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      res.status(400).json({ message: "Invalid filters characters" });
    }
  }
};

module.exports = getByFilter;
