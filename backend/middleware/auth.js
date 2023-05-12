const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const shop = require('../model/shop');

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies['token-user'];
  if (!token) {
    return next(new ErrorHandler('Please login to continue', 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decode.id);
  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies['token-shop'];

  if (!token) {
    return next(new ErrorHandler('Please login shop to continue!'));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.shop = await shop.findById(decode.id);
  next();
});
