const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const Coupon = require('../model/coupon');
const Shop = require('../model/shop');
const { isSeller } = require('../middleware/auth');
const router = express.Router();

// Create coupon code
router.post(
  '/create-coupon',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponExists = await Coupon.findOne({ name: req.body.name });
      if (couponExists) {
        return next(new ErrorHandler('Coupon code already exists!', 400));
      }
      const shop = await Shop.findById(req.body.shopId);
      const data = req.body;
      data.shop = shop;
      const coupon = await Coupon.create(data);

      return res.status(201).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Get all Coupon of shop
router.get(
  '/get-all-coupons-shop/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const coupons = await Coupon.find({ shopId: id });

      return res.status(201).json({
        success: true,
        coupons,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete coupon
router.delete(
  '/delete-coupon/:id',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const coupon = await Coupon.findByIdAndDelete(id);
      return res.status(201).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
