const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter your event product name!'],
  },
  description: {
    type: String,
    require: [true, 'Please enter your event product description!'],
  },
  category: {
    type: String,
    require: [true, 'Please enter your event  product category!'],
  },
  tags: {
    type: String,
    require: [true, 'Please enter your event  product tags!'],
  },
  originalPrice: {
    type: Number,
    require: [true, 'Please enter your event product price!'],
  },
  discountPrice: {
    type: Number,
    require: [true, 'Please enter your event  product discount!'],
  },
  stock: {
    type: Number,
    require: [true, 'Please enter your event  product stock!'],
  },
  images: [
    {
      type: String,
    },
  ],
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  shopId: {
    type: String,
    required: true,
  },
  slug: { type: String, slug: 'name', unique: true },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  status: {
    type: String,
    default: 'Running',
  },
});

module.exports = mongoose.model('Event', eventSchema);
