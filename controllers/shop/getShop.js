const { ValidationError } = require("../../helpers");
const { Catalog, Shop } = require("../../models");

const getShop = async (req, res, next) => {
  try {
    const catalog = await Catalog.find();
    let array = [...catalog];
    array.map(it => {
let item = {};
item.uuid = it.uuid;
item.title_ua = it.title_ua;
item.title_ru = it.title;
item.title_en = it.title_ua;
item.title_de = it.title_ua;
item.article = it.article;
item.description_ua = it.description;
item.description_de = it.description;
item.description_ru = it.description;
item.description_en = it.description;
item.man_women = it.categories.split(" > ")[0];
item.category = it.categories.split(" > ")[1];
item.product = it.categories.split(" > ")[2];
item.mainImage = it.mainImage;
item.images = it.images;
item.price = it.price;
item.creation_datetime = it.creation_datetime;
item.sizes = it.sizes;
item.size_chart_ru = it.size_chart_ru;
item.size_chart_ua = it.size_chart_ua;
item.size_chart_en = it.size_chart_ua;
item.size_chart_de = it.size_chart_ua;
item.newPrice = (it.price * 1.1).toFixed(2);
item.oldPrice = (it.price * 1.25).toFixed(2);
item.status = "new";
item.discount = +(item.oldPrice - item.newPrice).toFixed(2);
item.rate= (Math.random() * 11).toFixed(1);
Shop.create(item)
  })
const shop = await Shop.find().limit(12)
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getShop;
