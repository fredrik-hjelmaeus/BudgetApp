const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Preset = require('../models/Preset');
const auth = require('../middleware/auth');
const csvtojson = require('../middleware/csvtojson');

// @route   GET api/userpreset
// @desc    Get all user presets
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const presets = await Preset.find({ user: req.user.id }).sort({
      number: -1,
    });
    res.json(presets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/userpreset
// @desc    Add new preset
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('number', 'Number is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //validering avklarad

    const { name, number, month, year, category, type, piggybank } = req.body;
    try {
      const newPreset = new Preset({
        name,
        number,
        month,
        year,
        category,
        type,
        piggybank,
        user: req.user.id,
      });

      const preset = await newPreset.save();

      res.json(preset);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/userpreset/:id
// @desc    Update preset
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, number, category, type, piggybank } = req.body;

  // Build preset object
  const presetFields = {};
  if (name) presetFields.name = name;
  if (number) presetFields.number = number;
  if (category) presetFields.category = category;
  if (type) presetFields.type = type;
  if (piggybank) presetFields.piggybank = piggybank;

  try {
    let preset = await Preset.findById(req.params.id);

    if (!preset) return res.status(404).json({ msg: 'Preset not found' });

    // Make sure user owns preset
    if (preset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    preset = await Preset.findByIdAndUpdate(
      req.params.id,
      { $set: presetFields },
      { new: true }
    );

    res.json(preset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/userpreset/:id
// @desc    Delete preset
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let preset = await Preset.findById(req.params.id);

    if (!preset) return res.status(404).json({ msg: 'Preset not found' });

    // Make sure user owns preset
    if (preset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Preset.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Preset removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/userpreset/upload
// @desc    Add new presets with csv file
// @access  Private
router.post(
  '/',
  [
    csvtojson,

    /*     [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('number', 'Number is required')
        .not()
        .isEmpty()
    ] */
  ],
  async (req, res) => {
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
    console.log(req.newpresets);
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

      res.json('msg:happy');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
