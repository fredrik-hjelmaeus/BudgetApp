const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Preset = require('../models/Preset');

// @route   GET api/guide
// @desc    Get guide user presets
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const presets = await Preset.find({ user: '5fe3319b8062251df4e9e706' }).sort({
      number: -1,
    });
    res.json(presets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
