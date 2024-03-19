const {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
} = require("./users");
const Catalog = require("./catalog");
const DepartmentsNP = require("./departmentsNP");
const CitiesNP = require("./citiesNP");
const Care = require("./care");
const Basket = require("./basket");
const { Orders, orderValidationSchema } = require("./order");
const Category = require("./category");
const Shop = require("./shop");

module.exports = {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
  Catalog,
  DepartmentsNP,
  CitiesNP,
  Care,
  Orders,
  orderValidationSchema,
  Basket,
  Category,
  Shop,
};
