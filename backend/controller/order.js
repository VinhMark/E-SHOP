const express = require('express');

const router = express.Router();
const Order = require('../model/order');
const Product = require('../model/product');
const { isAuthenticated } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

// create order
router.post(
  '/create-order',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, subTotalPrice, paymentInfo, discountPrice, coupon } = req.body;

      // Group cart items by shop id
      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];
      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          totalPrice,
          subTotalPrice,
          user,
          paymentInfo,
          coupon,
          discountPrice,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all orders of seller
router.get(
  '/get-seller-all-orders/:shopId',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        'cart.shopId': req.params.shopId,
      }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

module.exports = router;
