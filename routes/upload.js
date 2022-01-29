const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const csvtojson = require('../middleware/csvtojson');

// @route   POST api/userpreset/upload
// @desc    Add new presets with csv file
// @access  Private
router.post(
  '/',
  authMiddleware,
  csvtojson,

  async (req, res) => {
    try {
      res.json(req.newpresets);
    } catch (err) {
      console.log('upload error here!');
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
