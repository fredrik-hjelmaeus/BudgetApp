const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const myAgent = req.header('my_user-agent');
    console.log(myAgent);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // validering avklarad!

    //destructurera req.body
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // om user existerar rapportera errormsg
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      //om user mail inte existerar , Skapa ny user
      user = new User({
        name,
        email,
        password,
      });

      // kryptera password med bcrypt och dess funktioner
      // salt är säkerthetsnivån, dvs 10 i detta fall
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
          res.json({ token });
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
