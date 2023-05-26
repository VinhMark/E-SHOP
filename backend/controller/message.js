const express = require('express');
const { isAuthenticated, isSeller } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const multer = require('../multer');
const Message = require('../model/message');
const router = express.Router();

// Create new message
router.post(
  '/create-message',
  isSeller,
  multer.array('images'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const imagesUrl = [];
      if (req.files) {
        req.files.forEach((image) => imagesUrl.push(image));
        messageData.images = imagesUrl;
      }

      const message = await Message.create(req.body);

      return res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Create new message
router.post(
  '/create-message-user',
  isAuthenticated,
  multer.array('images'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const imagesUrl = [];
      if (req.files) {
        req.files.forEach((image) => imagesUrl.push(image));
        messageData.images = imagesUrl;
      }

      const message = await Message.create(req.body);

      return res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  '/get-message-conversation/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Message.find({ conversationId: req.params.id });
      return res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
