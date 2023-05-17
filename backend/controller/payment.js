const express = require('express');
const router = express.Router();
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post(
  '/process',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        metadata: {
          company: 'Becodemy',
        },
      });

      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  '/stripeApiKey',
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  })
);

module.exports = router;
