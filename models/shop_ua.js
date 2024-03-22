const { Schema, model } = require("mongoose");

const shopSchema = new Schema({
  uuid: {
    type: String,
  },
  title: {
    type: String,
  },
  article: {
    type: String,
  },
  description: {
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
  creation_datetime: {
    type: String,
    default: "",
  },
  sizes: {
    type: String,
  },
  size_chart: {
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
});

const Shop_ua = model("Shop_ua", shopSchema);

module.exports = Shop_ua;
