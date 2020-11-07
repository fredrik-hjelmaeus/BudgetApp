const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Preset = require('../models/Preset');
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
    console.log('AFTER');
    /*     const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //validering avklarad */
    /*     if (!req.files) {
        return res.status(500).send('No File Uploaded');
      }
      const file = req.files.file;
      console.log(file.mimetype === 'text/csv'); */

    //Make sure the file is a csv-file
    /*  if (file.mimetype !== 'text/csv') {
        console.log('File must be of filetype csv!');
      } */
    // console.log(req.newpresets);
    //const { name, number, month, year, category, type, piggybank } = req.body;
    try {
      /*  const newPreset = new Preset({
          name,
          number,
          month,
          year,
          category,
          type,
          piggybank,
          user: req.user.id,
        });
  
        const preset = await newPreset.save(); */
      res.json(req.newpresets);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
