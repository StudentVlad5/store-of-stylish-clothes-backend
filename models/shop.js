const { Schema, model } = require("mongoose");

const shopSchema = new Schema({
  uuid: {
    type: String,
  },
  title_ua: {
    type: String,
  },
  title_ru: {
    type: String,
  },
  title_en: {
    type: String,
  },
  title_de: {
    type: String,
  },
  article: {
    type: String,
  },
  description_ua: {
    type: String,
  },
  description_ru: {
    type: String,
  },
  description_en: {
    type: String,
  },
  description_de: {
    type: String,
  },
  man_women_ua: {
    type: String,
  },
  man_women_ru: {
    type: String,
  },
  man_women_en: {
    type: String,
  },
  man_women_de: {
    type: String,
  },
  category_ua: {
    type: String,
  },
  category_ru: {
    type: String,
  },
  category_en: {
    type: String,
  },
  category_de: {
    type: String,
  },
  product_ua: {
    type: String,
  },
  product_ru: {
    type: String,
  },
  product_en: {
    type: String,
  },
  product_de: {
    type: String,
  },
  mainImage: {
    type: String,
  },
  images: {
    type: String,
  },
  creation_datetime: {
    type: String,
    default: "",
  },
  sizes_ua: {
    type: String,
  },
  sizes_ru: {
    type: String,
  },
  sizes_en: {
    type: String,
  },
  sizes_de: {
    type: String,
  },
  size_chart_ua: {
    type: String,
  },
  size_chart_ru: {
    type: String,
  },
  size_chart_en: {
    type: String,
  },
  size_chart_de: {
    type: String,
  },
  price_ua: {
    type: Number,
  },
  newPrice_ua: {
    type: Number,
  },
  oldPrice_ua: {
    type: Number,
  },
  price_usd: {
    type: Number,
  },
  newPrice_usd: {
    type: Number,
  },
  oldPrice_usd: {
    type: Number,
  },
  price_euro: {
    type: Number,
  },
  newPrice_euro: {
    type: Number,
  },
  oldPrice_euro: {
    type: Number,
  },
  status: {
    type: String,
  },
  discount_ua: {
    type: Number,
  },
  discount_usd: {
    type: Number,
  },
  discount_euro: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  active: {
    type: String,
    default: "true",
  },
});

const Shop = model("Shop", shopSchema);

module.exports = Shop;
