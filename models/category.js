const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  level_1: {
    type: Array,
    required: true,
    default:[],
  },
  level_2: {
    type: Array,
    default:[],
  },
  level_3: {
    type: Array,
    default:[],
  },
  level_4: {
    type: Array,
    default:[],
  },
});

const Category = model('Category', categorySchema);

module.exports = Category;
