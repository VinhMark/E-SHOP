const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your product name!'],
  },
  description: {
    type: String,
    required: [true, 'Please enter your product description!'],
  },
  category: {
    type: String,
    required: [true, 'Please enter your product category!'],
  },
  tags: {
    type: String,
    required: [true, 'Please enter your product tags!'],
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please enter your product price!'],
  },
  discountPrice: {
    type: Number,
    required: [true, 'Please enter your product discount!'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter your product stock!'],
  },
  images: {
    type: Array,
  },
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
  reviews: [
    {
      user: { type: Object },
      rating: { type: Number },
      comment: { type: String },
      productId: { type: String },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: { type: Number },
  shopId: {
    type: String,
    required: true,
  },
  slug: { type: String, slug: 'name', unique: true },
});

module.exports = mongoose.model('Product', productSchema);
