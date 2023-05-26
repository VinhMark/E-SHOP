const express = require('express');
const Conversation = require('../model/conversation');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { isAuthenticated, isSeller } = require('../middleware/auth');
const Product = require('../model/product');
const User = require('../model/user');
const Shop = require('../model/shop');
const router = express.Router();

// Create a new conversation
router.post(
  '/create-conversation',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
      const conversationExists = await Conversation.findOne({ groupTitle });
      if (conversationExists) {
        return res.status(201).json({ success: true, conversation: conversationExists });
      }

      const conversation = await Conversation.create({ members: [userId, sellerId], groupTitle });
      return res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get seller conversation
router.get(
  '/get-all-conversation-seller/:shopId',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.time();
      const conversations = await Conversation.find({ members: { $in: [req.params.shopId] } }).sort({
        updatedAt: -1,
        createdAt: -1,
      });

      const data = await Promise.all(
        conversations.map(async (conversation) => {
          conversation = conversation.toObject();
          const productId = conversation.groupTitle.split('-')[0];
          const userId = conversation.members.find((member) => member !== req.params.shopId);

          await Promise.all([
            Product.findById(productId).then((res) => {
              conversation.product = res;
            }),
            User.findById(userId).then((res) => {
              conversation.user = res;
            }),
          ]);
          return conversation;
        })
      );
      console.timeEnd();

      return res.status(201).json({
        success: true,
        conversations: data,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get user conversation
router.get(
  '/get-all-conversation-user/:userId',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.time();
      const conversations = await Conversation.find({ members: { $in: [req.params.userId] } }).sort({
        updatedAt: -1,
        createdAt: -1,
      });

      const data = await Promise.all(
        conversations.map(async (conversation) => {
          conversation = conversation.toObject();
          const productId = conversation.groupTitle.split('-')[0];
          const shopId = conversation.members.find((member) => member !== req.params.userId);

          await Promise.all([
            Product.findById(productId).then((res) => {
              conversation.product = res;
            }),
            Shop.findById(shopId).then((res) => {
              conversation.shop = res;
            }),
          ]);
          return conversation;
        })
      );
      console.timeEnd();

      return res.status(201).json({
        success: true,
        conversations: data,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  '/update-last-message/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;
      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });
      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
