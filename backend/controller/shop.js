const express = require('express');
const route = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const multer = require('../multer');
const Shop = require('../model/shop');
const removeImg = require('../utils/removeImg');
const sendMail = require('../utils/sendMail');
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendShopToken = require('../utils/shopToken');
const path = require('path');
const sendToken = require('../utils/jwtToken');
const { isSeller } = require('../middleware/auth');

// url: '/shop/create-shop' Api create new shop
route.post('/create-shop', multer.single('file'), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    console.log(sellerEmail);
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    if (sellerEmail) {
      removeImg(filename);
      return next(new ErrorHandler('User already exists!', 400));
    }

    // shop token
    const seller = req.body;
    seller.avatar = fileUrl;
    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: 'Activate your Shop',
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: - ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Create activate token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m',
  });
};

// Activate shop
route.post(
  '/activation',
  catchAsyncErrors(async (req, res, next) => {
    let img = '';
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
      img = newSeller?.avatar;

      if (!newSeller) {
        return next(new ErrorHandler('Invalid token!', 400));
      }

      let seller = await Shop.findOne({ email: newSeller.email });
      if (seller) {
        return next(new ErrorHandler('User already exists!', 400));
      }

      seller = await Shop.create(newSeller);
      sendShopToken(seller, 200, res);
    } catch (error) {
      // Delete img
      img && removeImg(img);
      console.log(error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login shop
route.post(
  '/shop-login',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler('Please provide the all fields!', 400));
      }

      const shop = await Shop.findOne({ email }).select('+password');
      if (!shop) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler('Please provide the correct information!', 400));
      }

      shop.password = '';
      sendToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get data shop login
route.get(
  '/getShop',
  isSeller,
  catchAsyncErrors((req, res, next) => {
    if (!req.shop) {
      return next(new ErrorHandler("Shop doesn't not exits!"));
    }
    res.status(200).json({ success: true, shop: req.shop });
  })
);

module.exports = route;
