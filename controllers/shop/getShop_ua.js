const { ValidationError } = require("../../helpers");
const { Catalog, Test_ua } = require("../../models");

const getShop_ua = async (req, res, next) => {
  const usd = 39;
  const euro = 42;
  try {
    const catalog = await Catalog.find();
    let array = [...catalog];
    array.map((it) => {
      let item = {};
      item.uuid = it.uuid;
      item.title = it.title;
      item.article = it.article;
      item.description = it.description;
      item.man_women = it.categories.split(" > ")[0];
      item.category = it.categories.split(" > ")[1];
      item.product = it.categories.split(" > ")[2];
      item.mainImage = it.mainImage;
      item.images = it.images;
      item.creation_datetime = it.creation_datetime;
      item.sizes = it.sizes;
      item.size_chart = it.size_chart_ua;
      item.price_ua = it.price;
      if (item.category.includes("Аксесуари")) {
        item.newPrice_ua = (it.price * 1.25).toFixed(2);
        item.oldPrice_ua = (it.price * 1.45).toFixed(2);
      } else if (item.category.includes("Взуття")) {
        item.newPrice_ua = (it.price * 1.15).toFixed(2);
        item.oldPrice_ua = (it.price * 1.26).toFixed(2);
      } else {
        item.newPrice_ua = (it.price * 1.2).toFixed(2);
        item.oldPrice_ua = (it.price * 1.35).toFixed(2);
        // item.newPrice_ua = (it.price * 1.1).toFixed(2);
        // item.oldPrice_ua = (it.price * 1.25).toFixed(2);
      }
      item.price_usd = (it.price / usd).toFixed(2);
      item.newPrice_usd = (item.newPrice_ua / usd).toFixed(2);
      item.oldPrice_usd = (item.oldPrice_ua / usd).toFixed(2);
      item.price_euro = (it.price / euro).toFixed(2);
      item.newPrice_euro = (item.newPrice_ua / euro).toFixed(2);
      item.oldPrice_euro = (item.oldPrice_ua / euro).toFixed(2);
      const status = Math.floor(Math.random() * 4);
      item.status =
        status === 0
          ? "new"
          : status === 1
          ? "rate"
          : status === 2
          ? "discount"
          : "";
      item.discount_ua = +(item.oldPrice_ua - item.newPrice_ua).toFixed(2);
      item.discount_usd = +(item.oldPrice_usd - item.newPrice_usd).toFixed(2);
      item.discount_euro = +(item.oldPrice_euro - item.newPrice_euro).toFixed(
        2
      );
      item.rate = (Math.random() * (10 - 6) + 6).toFixed(1);
      Test_ua.create(item);
    });
    const shop = await Test_ua.find().limit(12);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getShop_ua;
