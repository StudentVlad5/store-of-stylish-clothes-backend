const { Schema, model } = require("mongoose");

const shopSchema = new Schema(
  {
    title: {
      type: String,
    },
    article: {
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
    mainImage: {
      type: String,
    },
    list_of_articles: {
      type: Array,
    },
    status: {
      type: String,
      default: "new",
    },
    active: {
      type: String,
      default: "true",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ReadyStyles = model("ReadyStyles", shopSchema);

module.exports = ReadyStyles;
