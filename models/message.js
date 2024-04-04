const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-email');


const eMailValidationSchema = Joi.object({
  email: Joi.string().email().required(),
});


const MessagesSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, 'Set email'],
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Messages = mongoose.model('messages', MessagesSchema);

module.exports = { Messages, eMailValidationSchema };
