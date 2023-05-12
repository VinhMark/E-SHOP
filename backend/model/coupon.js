const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter your event product name!'],
    unique: true,
  },
  value: {
    type: Number,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  shop: {
    type: Object,
    required: true,
  },
  shopId: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Coupon', couponSchema);
