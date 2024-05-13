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
const Category_ua = require("./category_ua");
const Category_ru = require("./category_ru");
const Category_en = require("./category_en");
const Category_de = require("./category_de");
const ReadyStyles = require("./ready_styles");
const Shop = require("./shop");
const Shop_ua = require("./shop_ua");
const Shop_ru = require("./shop_ru");
const Shop_en = require("./shop_en");
const Shop_de = require("./shop_de");
const Test_de = require("./test_de");
const Test_en = require("./test_en");
const Test_ru = require("./test_ru");
const Test_ua = require("./test_ua");
const { Messages, eMailValidationSchema } = require("./message");

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
  Category_ua,
  Category_ru,
  Category_en,
  Category_de,
  Shop,
  Shop_ua,
  Shop_ru,
  Shop_en,
  Shop_de,
  Test_ua,
  Test_ru,
  Test_en,
  Test_de,
  Messages,
  ReadyStyles,
  eMailValidationSchema,
};
