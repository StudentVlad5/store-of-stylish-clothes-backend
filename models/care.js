const { Schema, model } = require("mongoose");

const careSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  latin: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
  },
  common: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  climate: {
    type: String,
    required: true,
  },
  tempmax: {
    celsius: {
      type: Number,
      required: true,
    },
    fahrenheit: {
      type: Number,
      required: true,
    },
  },
  tempmin: {
    celsius: {
      type: Number,
      required: true,
    },
    fahrenheit: {
      type: Number,
      required: true,
    },
  },
  ideallight: {
    type: String,
    required: true,
  },
  toleratedlight: {
    type: String,
    required: true,
  },
  watering: {
    type: String,
    required: true,
  },
  insects: {
    type: Array,
    required: true,
  },
  diseases: {
    type: Array,
    required: true,
  },
  use: {
    type: Array,
    required: true,
  },
});

const Care = model("Care", careSchema);

module.exports = Care;
