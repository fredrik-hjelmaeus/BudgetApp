const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Private
router.post(
  '/',

  [
    check('email', 'Email is required').isEmail(),
    check('password', 'The password must be 6+ chars long and contain a number')
      .exists()
      .isLength({ min: 6 })
      .withMessage('must be at least 6 chars long')
      .matches(/\d/),
  ],
  async (req, res) => {
    const myAgent = req.header('my_user-agent');

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //react native check
      //react native ska inte ha en expiration på sitt auth då det är en mobilapp
      if (myAgent && myAgent === 'react') {
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
          if (err) throw err;
          console.log(token);
          res.json({ token });
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/auth/forgotpassword
// @desc    Forgot password
// @access  Public
router.post('/forgotpassword', [check('email', 'Please include a valid email').isEmail()], async (req, res) => {
  //validate : check if a valid mail syntax was used
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'There is no user with that email' }] });
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/forgotpassword/${resetToken}`;
    const resetUrlTwo =
      config.get('resetpasswordURL') === 'development'
        ? `https://dry-eyrie-55051.herokuapp.com/resetpassword/${resetToken}`
        : `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please follow this link to create new password: \n\n ${resetUrlTwo}`;
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ data: 'Email could not be sent' });
    }

    // res.status(200).json({ msg: 'Email sent, check your mailbox', data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc          Reset Password
// @route         PUT /api/auth/resetpassword/:resettoken
// @access        Public
router.put('/resetpassword/:resettoken', async (req, res) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ data: 'Invalid token' });
    }

    // Set/Encrypt new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ data: 'Password Changed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc          Update user details
// @route         PUT /api/auth/updatedetails
// @access        Private
router.put('/updatedetails', auth, [check('email', 'Please include a valid email').isEmail()], async (req, res) => {
  //validering
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // extract information from request
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
    };

    // make sure new requested email is not already in use
    const emailInUse = await User.findOne({ email: req.body.email });
    // if it exist a user with that email and it's not the id of the authenticated user ,cancel change
    if (emailInUse && emailInUse.id !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'This email is already in use' }] });
    }

    // update user
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: user, msg: 'Successfully updated profile' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc          Update password
// @route         PUT /api/auth/updatepassword
// @access        Private
router.put(
  '/updatepassword',
  [check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })],
  auth,
  async (req, res) => {
    //validering
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('+password');

      // Check current password
      if (!(await bcrypt.compare(req.body.currentPassword, user.password))) {
        return res.status(401).json({ errors: [{ msg: 'Password is incorrect' }] });
      }

      // Set/Encrypt new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();
      res.status(200).json({ msg: 'Password Updated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
