const Joi = require('joi');
// const { string } = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-email');
require('mongoose-type-url');

const userValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(32).required(),
  surname: Joi.string().min(3).max(32),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(32).required(),
  location: Joi.string().required(),
  phone: Joi.string().min(7).max(13).required(),
  birthday: Joi.date(),
  avatar: Joi.string().uri(),
  favorites: Joi.array(),
  delivery: Joi.string(),
  address: Joi.object(),
});

const userUpdateValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(32),
  surname: Joi.string().min(3).max(32),
  email: Joi.string().email(),
  password: Joi.string().min(7).max(32),
  location: Joi.string(),
  phone: Joi.string().min(7).max(32),
  birthday: Joi.date(),
  avatar: Joi.string().uri(),
  favorites: Joi.array(),
  delivery: Joi.string(),
  address: Joi.object(),
});

const UsersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Set user name'],
    },
    surname: {
      type: String,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, 'Set email user'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password'],
    },
    location: {
      type: String,
      required: [true, 'Set comments for pet'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone Number'],
    },
    birthday: {
      type: Date,
      // required: [false, 'Set birthday user'],
    },
    avatar: {
      type: mongoose.SchemaTypes.Url,
      default: '',
    },
    favorites: {
      type: Array,
      default: [],
    },
    delivery: {
      type: String,
    },
    address: {
      type: Object,
      default: {},
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    authToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model('users', UsersSchema);

module.exports = { Users, userValidationSchema, userUpdateValidationSchema };
