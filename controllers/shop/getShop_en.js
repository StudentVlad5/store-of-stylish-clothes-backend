const { ValidationError } = require("../../helpers");
const { Catalog, Shop_en, Shop_ua } = require("../../models");

const getShop_en = async (req, res, next) => {
  const usd = 38;
  const euro = 42;
  try {
    const shop_en = await Shop_en.find();
    const shop_ua = await Shop_ua.find()

    let array_en = [...shop_en];
    let array_ua = [...shop_ua];

    array_ua.map(key => {
    array_en.map(it=>{
    if(key.uuid === it.uuid){
    it.newPrice_ua = key.newPrice_ua;
    it.oldPrice_ua = key.oldPrice_ua;
    it.price_usd = key.price_usd;
    it.newPrice_usd = key.newPrice_usd;
    it.oldPrice_usd = key.oldPrice_usd;
    it.price_euro = key.price_euro;
    it.newPrice_euro = key.newPrice_euro;
    it.oldPrice_euro = key.oldPrice_euro;
    it.discount_ua = key.discount_ua;
    it.discount_euro = key.discount_euro;
    it.discount_usd = key.discount_usd;
    it.status = key.status;
    it.rate = key.rate;

    Shop_en.deleteOne({uuid: it.uuid});
    Shop_en.create(it);
    }})
    })
  
  
//     const catalog = await Catalog.find();
//     let array = [...catalog];
//     array.map(it => {
// let item = {};
// item.uuid = it.uuid;
// item.title = it.title;
// item.article = it.article;
// item.description = it.description;
// item.man_women = it.categories.split(" > ")[0];
// item.category = it.categories.split(" > ")[1];
// item.product = it.categories.split(" > ")[2];
// item.mainImage = it.mainImage;
// item.images = it.images;
// item.creation_datetime = it.creation_datetime;
// item.sizes = it.sizes;
// item.size_chart = it.size_chart_ru;
// item.price_ua = it.price;
// item.newPrice_ua = (it.price * 1.1).toFixed(2);
// item.oldPrice_ua = (it.price * 1.25).toFixed(2);
// item.price_usd = it.price/usd;
// item.newPrice_usd = (it.price/usd * 1.1).toFixed(2);
// item.oldPrice_usd = (it.price/usd * 1.25).toFixed(2);
// item.price_euro = it.price/euro;
// item.newPrice_euro = (it.price/euro * 1.1).toFixed(2);
// item.oldPrice_euro = (it.price/euro * 1.25).toFixed(2);
// item.status = "new";
// item.discount_ua = +(item.oldPrice_ua - item.newPrice_ua).toFixed(2);
// item.discount_usd = +(item.oldPrice_usd - item.newPrice_usd).toFixed(2);
// item.discount_euro = +(item.oldPrice_euro - item.newPrice_euro).toFixed(2);
// item.rate= (Math.random() * 11).toFixed(1);
// Shop_en.create(item)
//   })
const shop = await Shop_en.find().limit(12)
    res.status(200).json(shop);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getShop_en;
