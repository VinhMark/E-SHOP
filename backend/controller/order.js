const express = require('express');

const router = express.Router();
const Order = require('../model/order');
const Product = require('../model/product');
const { isAuthenticated, isSeller } = require('../middleware/auth');
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
          tracker: [{ status: 'Precessing' }],
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

// get all order of user
router.get(
  '/get-all-orders/:userId',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ 'user._id': req.params.userId }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Update status order
router.put(
  '/update-status-order',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderId, status } = req.body;
      const order = await Order.findById(orderId);
      if (!order) {
        return next(new ErrorHandler('Order is not found with this id!', 400));
      }

      const updateProduct = async (id, qty, isRefund = false) => {
        const product = await Product.findById(id);
        product.stock = isRefund ? product.stock + qty : product.stock - qty;
        product.sold_out = isRefund ? product.sold_out - qty : product.sold_out + qty;
        await product.save({ validateBeforeSave: false });
        return product;
      };

      // update qty product
      if (status === 'Transferred to delivery partner') {
        await Promise.all(order.cart.map((o) => updateProduct(o._id, o.qty)));
      }
      // update qty refund product
      if (status === 'Refund Success') {
        order.tracker.push({ status, message: 'Your order is refund successfully!' });
        await Promise.all(order.cart.map((o) => updateProduct(o._id, o.qty, true)));
      }

      order.status = status;
      const isTrackerExists = order.tracker.findIndex((i) => i.status === status);
      if (isTrackerExists < 0) {
        order.tracker.push({ status, message: 'Status is ' + status });
      }
      order.save();
      return res.status(201).json({ success: true, order });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get order by id
router.get(
  '/get-order/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Give a refund
router.put(
  '/order-refund/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler('Order not found with this id!', 400));
      }
      order.status = req.body.status;
      await order.save();

      return res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all order refund of user
router.get(
  '/get-all-order-refund-user/:userId',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({
        'user._id': userId,
        status: { $in: ['Processing Refund', 'Refund Success'] },
      }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
