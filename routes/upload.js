const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const csvtojson = require('../middleware/csvtojson');

// @route   POST api/userpreset/upload
// @desc    Add new presets with csv file
// @access  Private
router.post(
  '/',
  auth,
  csvtojson,

  async (req, res) => {
    try {
      res.json(req.newpresets);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
