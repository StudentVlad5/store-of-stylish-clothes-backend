const Joi = require("joi");
const mongoose = require("mongoose");

const BasketSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "",
    },
    optionData: {
      type: Array,
      default: {},
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Basket = mongoose.model("basket", BasketSchema);

module.exports = Basket;
