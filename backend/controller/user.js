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
const multer = require('../multer');

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
        message: 'Please check your email: ' + user.email + ' to active your account.',
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

      const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

      if (!newUser) {
        return next(new ErrorHandler('Invalid token', 400));
      }

      const userExists = await userModel.findOne({ email: newUser.email });
      if (userExists) {
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
        return next(new ErrorHandler('Please provide the correct information', 400));
      }

      sendToken(user, 200, res, 'user');
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

// Logout
router.get(
  '/logout',
  isAuthenticated,
  catchAsyncErrors((req, res, next) => {
    try {
      res.clearCookie('token-user');

      res.status(201).json({
        success: true,
        message: 'User logged out successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user
router.put(
  '/updateUser',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const newUser = req.body;

      // get user
      const user = await userModel.findOne({ email: newUser.email }).select('+password');
      if (!user) {
        return next(new ErrorHandler('User not found!', 400));
      }

      const isPasswordValid = await user.comparePassword(newUser.password);
      // check Password
      if (!isPasswordValid) {
        return next(new ErrorHandler('Please provide the correct information!', 400));
      }

      const userUpdate = await userModel.findByIdAndUpdate(newUser._id, {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      });
      return res.status(201).json({
        success: true,
        user: userUpdate,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);

// Update user avatar
router.patch(
  '/update-avatar',
  isAuthenticated,
  multer.single('image'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.user._id;
      const userExists = await userModel.findById(id);
      removeImg(userExists.avatar);
      const fileUrl = path.join(req.file.filename);
      const user = await userModel.findByIdAndUpdate(req.user._id, { avatar: fileUrl });
      user.avatar = fileUrl;

      return res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update user addresses
router.put(
  '/update-user-addresses',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);

      const sameTypeAddress = user.addresses.find((address) => address.addressType === req.body.addressType);
      if (sameTypeAddress) {
        return next(new ErrorHandler(`${req.body.addressType} address already exists!`));
      }

      const existAddress = user.addresses.find((address) => address._id === req.body.id);
      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }
      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete user address
router.delete(
  '/delete-user-address/:id',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id);
      const id = req.params.id;

      user.addresses = user.addresses.filter((item) => item._id.toString() !== id);
      await user.save();

      return res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 400);
    }
  })
);

// Update password
router.put(
  '/update-password',
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user._id).select('+password');
      const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

      if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password is incorrect!', 400))
      }

      user.password = req.body.newPassword;

      await user.save();

      return res.status(201).json({
        success: true,
        message: 'Password update successfully!'
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
