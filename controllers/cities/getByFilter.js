const axios = require("axios");

const getByFilter = async (req, res, next) => {
  const filter = req.body.filter.split("(")[0];

  const customHeaders = {
    "Content-Type": "application/json, text/plain, */*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-control-allow-headers":
      "Origin,authorization,Access-Control-Allow-Origin,Content-Type,SOAPAction",
    "Cache-control": "max-age=43200, public, must-revalidate, proxy-revalidate",
  };

  if (filter) {
    try {
      axios
        .get(
          `https://offices.ukrposhta.ua/requests/controller.php?method=get_city_by_region_id_and_district_id_and_city_ua&city_ua=${filter}`,
          {
            headers: customHeaders,
          }
        )
        .then((data) => {
          res.status(200).json(data.data);
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
