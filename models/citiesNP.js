const { Schema, model } = require("mongoose");

const citiesNPSchema = new Schema({
  Description: {
    type: String,
    required: true,
  },
  DescriptionRu: {
    type: String,
    required: true,
  },
  Ref: {
    type: String,
    required: true,
  },
  Delivery1: {
    type: String,
    required: true,
  },
  Delivery2: {
    type: String,
    required: true,
  },
  Delivery3: {
    type: String,
    required: true,
  },
  Delivery4: {
    type: String,
    required: true,
  },
  Delivery5: {
    type: String,
    required: true,
  },
  Delivery6: {
    type: String,
    required: true,
  },
  Delivery7: {
    type: String,
    required: true,
  },
  Area: {
    type: String,
    required: true,
  },
  SettlementType: {
    type: String,
    required: true,
  },
  IsBranch: {
    type: String,
    required: true,
  },
  PreventEntryNewStreetsUser: {
    type: String,
    required: true,
  },
  CityID: {
    type: String,
    required: true,
  },
  SettlementTypeDescription: {
    type: String,
    required: true,
  },
  SettlementTypeDescriptionRu: {
    type: String,
    required: true,
  },
  SpecialCashCheck: {
    type: Number,
    required: true,
  },
  AreaDescription: {
    type: String,
    required: true,
  },
  AreaDescriptionRu: {
    type: String,
    required: true,
  },
});

const CitiesNP = model("CitiesNP", citiesNPSchema);

module.exports = CitiesNP;
