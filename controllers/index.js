const auth = require("./auth");
// const user = require("./user");
const catalog = require("./catalog");
const shop = require("./shop");
const category = require("./category");
const cities = require("./cities");
const departments = require("./departments");
const care = require("./care");
const order = require("./order");
const basket = require("./basket");
const message = require("./message");

module.exports = {
  auth,
  catalog,
  cities,
  departments,
  care,
  order,
  basket,
  category,
  shop,
  message
};
