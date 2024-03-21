const { Schema, model } = require("mongoose");

const shopSchema = new Schema({
  uuid: {
    type: String,
  },
  title_ua: {
    type: String,
  },
  title_de: {
    type: String,
  },
  title_ru: {
    type: String,
  },
  title_en: {
    type: String,
  },
  article: {
    type: String,
  },
  description_ua: {
    type: String,
  },
  description_de: {
    type: String,
  },
  description_ru: {
    type: String,
  },
  description_en: {
    type: String,
  },
  man_women: {
    type: String,
  },
  category: {
    type: String,
  },
  product: {
    type: String,
  },
  mainImage: {
    type: String,
  },
  images: {
    type: String,
  },
  price: {
    type: Number,
  },
  creation_datetime: {
    type: String,
    default: "",
  },
  sizes: {
    type: String,
  },
  size_chart_ru: {
    type: String,
  },
  size_chart_ua: {
    type: String,
  },
  size_chart_en: {
    type: String,
  },
  size_chart_de: {
    type: String,
  },
  newPrice: {
    type: Number,
  },
  oldPrice: {
    type: Number,
  },
  status: {
    type: String,
  },
  discount: {
    type: Number,
  },
  rate: {
    type: Number,
  },
});

const Shop = model("Shop", shopSchema);

module.exports = Shop;
