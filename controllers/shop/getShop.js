const { ValidationError } = require("../../helpers");
const { Shop, Shop_ua, Shop_ru, Shop_en, Shop_de } = require("../../models");

const getShop = async (req, res, next) => {
  let item={};
  try {
    const catalog_ru = await Shop_ru.find();
    const catalog_en = await Shop_en.find();
    const catalog_de = await Shop_de.find();
    const catalog = await Shop_ua.find();
    let array = [...catalog];

    array.map((it) => {
      item.uuid = it.uuid;
      item.title_ua = it.title;
      item.article = it.article;
      item.description_ua = it.description;
      item.man_women_ua = it.man_women;
      item.category_ua = it.category;
      item.product_ua = it.product;
      item.mainImage = it.mainImage;
      item.images = it.images;
      item.creation_datetime = it.creation_datetime;
      item.sizes_ua = it.sizes;
      item.size_chart_ua = it.size_chart;
      item.price_ua = it.price_ua;
      item.newPrice_ua = it.newPrice_ua;
      item.oldPrice_ua = it.oldPrice_ua;
      item.price_usd = it.price_usd;
      item.newPrice_usd = it.newPrice_usd;
      item.oldPrice_usd = it.oldPrice_usd;
      item.price_euro = it.price_euro;
      item.newPrice_euro = it.newPrice_euro;
      item.oldPrice_euro = it.oldPrice_euro;
      it.status ? item.status = it.status : item.status = "new";
      item.discount_ua = it.discount_ua;
      item.discount_usd = it.discount_usd;
      item.discount_euro = it.discount_euro;
      item.rate = it.rate;
      item.active = "true";
      let it_ru = catalog_ru.find((it) => it.article === item.article);
      if(!it_ru){it_ru = catalog_ru.find((it) => it.uuid === item.uuid);} 
      item.title_ru = it_ru.title;
      item.description_ru = it_ru.description;
      item.man_women_ru = it_ru.man_women;
      item.category_ru = it_ru.category;
      item.product_ru = it_ru.product;
      item.sizes_ru = it_ru.sizes;
      item.size_chart_ru = it_ru.size_chart;
      let it_en = catalog_en.find((it) => it.article === item.article);
      if(!it_en){it_en = catalog_en.find((it) => it.uuid === item.uuid);} 
      item.title_en = it_en.title;
      item.description_en = it_en.description;
      item.man_women_en = it_en.man_women;
      item.category_en = it_en.category;
      item.product_en = it_en.product;
      item.sizes_en = it_en.sizes;
      item.size_chart_en = it_en.size_chart;
      let it_de = catalog_de.find((it) => it.article === item.article);
      if(!it_de){it_de = catalog_de.find((it) => it.uuid === item.uuid);} 
      item.title_de = it_de.title;
      item.description_de = it_de.description;
      item.man_women_de = it_de.man_women;
      item.category_de = it_de.category;
      item.product_de = it_de.product;
      item.sizes_de = it_de.sizes;
      item.size_chart_de = it_de.size_chart;
      Shop.create(item);
    });
    const shop = await Shop.find().limit(12);
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getShop;
