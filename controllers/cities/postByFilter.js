const { CitiesNP } = require("../../models");
const axios = require("axios");

const postByFilter = async (req, res, next) => {
  const filter = req.body.filter;

  // запит на НП
//   const customHeaders = {
//     "Content-Type": "application/json, text/plain, */*",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
//     "Access-control-allow-headers":
//       "Origin,authorization,Access-Control-Allow-Origin,Content-Type,SOAPAction",
//     "Cache-control": "max-age=43200, public, must-revalidate, proxy-revalidate",
//   };
//   if (filter) {
//     try {
//       axios({
//         method: 'post',
//         url: `https://api.novaposhta.ua/v2.0/json/`,
//         headers: customHeaders, 
//         data: {
//           apiKey: process.env.NovaPoshta_KEY,
//           modelName: "Address",
//           calledMethod: "getCities",
//           Warehouse: 1,
//           methodProperties: {
//             Warehouse: "1",
//             FindByString: filter,
//             Limit: "30",
//           },
//         },
//       })
//         .then((data) => {
//           res.status(200).json(data.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     } catch (error) {
//       res.status(400).json({ message: "Invalid filters characters" });
//     }
//   }

if (filter) {
  try {
    const cities = await CitiesNP.find({
      Description: { $regex: `${filter}`, $options: "i" },
    });
    res.status(200).json(cities);
  } catch (error) {
    res.status(400).json({ message: "Invalid filters characters" });
  }};
};

module.exports = postByFilter;
