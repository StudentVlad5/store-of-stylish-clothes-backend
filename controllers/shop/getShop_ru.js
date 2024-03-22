const { ValidationError } = require("../../helpers");
const { Catalog, Shop_ru } = require("../../models");

const getShop_ru = async (req, res, next) => {
  const usd = 38;
  const euro = 42;
  try {
    const catalog = await Catalog.find();
    let array = [...catalog];
    array.map(it => {
let item = {};
item.uuid = it.uuid;
item.title = it.title_ua;
item.article = it.article;
item.description = it.description;
item.man_women = it.categories.split(" > ")[0];
item.category = it.categories.split(" > ")[1];
item.product = it.categories.split(" > ")[2];
item.mainImage = it.mainImage;
item.images = it.images;
item.creation_datetime = it.creation_datetime;
item.sizes = it.sizes;
item.size_chart = it.size_chart_ru;
item.price_ua = it.price;
item.newPrice_ua = (it.price * 1.1).toFixed(2);
item.oldPrice_ua = (it.price * 1.25).toFixed(2);
item.price_usd = it.price/usd;
item.newPrice_usd = (it.price/usd * 1.1).toFixed(2);
item.oldPrice_usd = (it.price/usd * 1.25).toFixed(2);
item.price_euro = it.price/euro;
item.newPrice_euro = (it.price/euro * 1.1).toFixed(2);
item.oldPrice_euro = (it.price/euro * 1.25).toFixed(2);
item.status = "new";
item.discount_ua = +(item.oldPrice_ua - item.newPrice_ua).toFixed(2);
item.discount_usd = +(item.oldPrice_usd - item.newPrice_usd).toFixed(2);
item.discount_euro = +(item.oldPrice_euro - item.newPrice_euro).toFixed(2);
item.rate= (Math.random() * 11).toFixed(1);
Shop_ru.create(item)
  })
const shop = await Shop_ru.find().limit(12)
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getShop_ru;
