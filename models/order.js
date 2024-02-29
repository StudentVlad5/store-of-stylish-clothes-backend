const Joi = require('joi');
const mongoose = require('mongoose');
require('mongoose-type-email');
require('mongoose-type-url');

const orderValidationSchema = Joi.object({
  user_id: Joi.string().min(3).max(32).required(),
  basket: Joi.array().required(),
  totalAmount: Joi.string().min(1).max(32).required(),
  totalDiscount: Joi.string().min(1).max(32).required(),
  totalPayment: Joi.string().min(1).max(32).required(),
  delivery: Joi.array().required(),
  metodPayment: Joi.array().required(),
});

const OrdersSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: 'not avtorization',
    },
    basket: {
      type: Object,
      required: [true, 'Set basket order'],
      default: {},
    },
    totalAmount: {
      type: Number,
      required: [true, 'Set totalAmount'],
    },
    totalDiscount: {
      type: Number,
      required: [true, 'Set totalDiscount'],
    },
    totalPayment: {
      type: Number,
      required: [true, 'Set totalPayment'],
    },
    currency: {
      type: String,
      required: [true, 'Set totalPayment'],
    },
    deliveryOrder: {
      type: Object,
      required: [true, 'Set delivery'],
      default: {},
    },
    selectedPaymentOption: {
      type: String,
      required: [true, 'Set methodPayment'],
    },
    name: {
      type: String,
      required: [true, 'Set userName'],
    },
    company: {
      type: String,
      // required: [true, "Set company"],
    },
    city: {
      type: String,
      required: [true, 'Set city'],
    },
    address1: {
      type: String,
      required: [true, 'Set address1'],
    },
    address2: {
      type: String,
      // required: [true, "Set address2"],
    },
    state: {
      type: String,
      required: [true, 'Set state'],
    },
    zipCode: {
      type: String,
      required: [true, 'Set zipCode'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone'],
    },
    email: {
      type: String,
      required: [true, 'Set email'],
    },
    comments: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Orders = mongoose.model('order', OrdersSchema);

module.exports = { Orders, orderValidationSchema };
