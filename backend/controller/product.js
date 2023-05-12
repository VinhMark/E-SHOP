const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Shop = require('../model/shop');
const multer = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const removeImg = require('../utils/removeImg');

// Create product
router.post(
  '/create-product',
  multer.array('images'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler('Shop invalid!', 400));
      }

      const files = req.files;
      const imageUrls = files.map((i) => i.filename);

      const productData = req.body;
      productData.images = imageUrls;
      productData.shop = shop;

      console.log(productData);
      const product = await Product.create(productData);
      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all product of a shop
router.get(
  '/get-all-products-shop/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      return res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all product of a category
router.get(
  '/get-all-products-category/:category',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ category: req.params.category }).limit(5);
      return res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all product of a category
router.get(
  '/get-all-products-search',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { search } = req.query;
      const products = await Product.find({ name: { $regex: '.*' + search + '*.' } }).limit(10);
      return res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete product
router.delete(
  '/delete-shop-product/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return next(new ErrorHandler('Product not found with this id!', 400));
      }

      product.images.forEach((i) => removeImg(i));

      return res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  '/get-product-slug/:slug',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const product = await Product.findOne({ slug });

      return res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all product
router.get(
  '/get-all-products',
  catchAsyncErrors(async (req, res, next) => {
    try {
      let products;
      let { category, limit } = req.query;
      if (category && category !== 'null') {
        products = await Product.find({ category })
          .sort({ createdAt: -1 })
          .limit(limit ? limit : 12);
      } else {
        products = await Product.find()
          .sort({ createdAt: -1 })
          .limit(limit ? limit : 12);
      }
      return res.status(200).json({ success: true, products });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all product
router.get(
  '/get-best-seller-products',
  catchAsyncErrors(async (req, res, next) => {
    try {
      let products;
      let { category, limit } = req.query;

      if (category && category !== 'null') {
        products = await Product.find({ category }).sort({ sold_out: -1 });
      } else {
        products = await Product.find().sort({ sold_out: -1 });
      }
      return res.status(200).json({ success: true, products });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
