const express = require('express');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const multer = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const Shop = require('../model/shop');
const Event = require('../model/event');
const router = express.Router();

router.post(
  '/create-event',
  multer.single('image'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler('Shop is invalid!'));
      }

      const file = req.file.filename;

      const eventData = req.body;
      eventData.image = file;
      eventData.shop = shop;

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get all events of shop
router.get(
  '/get-all-events-shop/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;
      const events = await Event.find({ shopId: id });

      return res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Get all events
router.get(
  '/get-all-events',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Delete event
router.delete(
  '/delete-shop-event/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      const event = await Event.findByIdAndDelete(id);
      if (!event) {
        return next(new ErrorHandler('Event not found with this id!', 400));
      }

      removeImg(event.image);

      return res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  '/get-event-by-slug/:slug',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findOne({ slug: req.params.slug });
      return res.status(200).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
