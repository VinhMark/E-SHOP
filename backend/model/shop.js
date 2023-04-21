const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your shop name!'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email!'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password!'],
    minLength: [6, 'Password should be greater than 6 characters!'],
    select: false,
  },
  description: { type: String },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  role: {
    type: String,
    default: 'Seller',
  },
  avatar: {
    type: String,
    required: true,
  },
  zip: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Number,
});

// Hash password
shopSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword, this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Shop', shopSchema);
