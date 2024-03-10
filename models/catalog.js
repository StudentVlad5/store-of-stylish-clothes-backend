const { Schema, model } = require('mongoose');

const catalogSchema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  title_ua: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  creation_datetime: {
    type: String,
    default: '',
    // required: true,
  },
  sizes: {
    type: String,
    required: true,
  },
  size_chart_ru: {
    type: String,
    required: true,
  },
  size_chart_ua: {
    type: String,
    required: true,
  },
});

const Catalog = model('Catalog', catalogSchema);

module.exports = Catalog;
