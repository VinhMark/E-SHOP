const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart: {
    type: Array,
    required: true,
  },
  shippingAddress: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  subTotalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  coupon: {
    type: Object,
  },
  status: {
    type: String,
    default: 'Processing',
  },
  tracker: [
    {
      status: { type: String },
      message: { type: String },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Order', orderSchema);
