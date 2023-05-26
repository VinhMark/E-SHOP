const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: { type: String },
    sender: {
      type: String,
    },
    message: { type: String },
    images: { type: Array },
    isShop: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
