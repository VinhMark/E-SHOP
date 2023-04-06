const express = require('express');
const path = require('path');
const userModel = require('../model/user');
const router = express.Router();
const upload = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const removeImg = require('../utils/removeImg');
const { isAuthenticated } = require('../middleware/auth');

router.post('/create-user', upload.single('file'), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await userModel.findOne({ email });

    if (userEmail) {
      removeImg(req.file.filename);
      return next(new ErrorHandler('User already exists', 400));
    }

    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);
    const user = { name, email, password, avatar: fileUrl };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name} please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message:
          'Please check your email: ' + user.email + ' to active your account.',
      });
    } catch (error) {
      removeImg(req.file.filename);
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: '5m' });
};

// Activate user
router.post(
  '/activation',
  catchAsyncErrors(async (req, res, next) => {
    let img = '';
    try {
      const { activation_token } = req.body;
      img = jwt.decode(activation_token)?.avatar;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler('Invalid token', 400));
      }

      const userEmail = await userModel.findOne({ email: newUser.email });
      if (userEmail) {
        return next(new ErrorHandler('User already exists', 400));
      }

      const user = await userModel.create(newUser);
      sendToken(user, 201, res);
    } catch (error) {
      if (img) {
        removeImg(img);
      }
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Login user
router.post(
  '/login',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler('Please provide the all fields!', 400));
      }

      const user = await userModel.findOne({ email }).select('+password');
      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(
          new ErrorHandler('Please provide the correct information', 400)
        );
      }

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load user
router.get(
  '/getUser',
  isAuthenticated,
  catchAsyncErrors((req, res, next) => {
    try {
      if (!req.user) {
        return next(new ErrorHandler("User doesn't exists.", 400));
      }
      res.status(200).json({ success: true, user: req.user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
