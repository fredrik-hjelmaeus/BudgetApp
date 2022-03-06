import express, { Request, Response } from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import Preset, { IUpdatablePresetFields, IPreset } from '../models/Preset';
import csvtojson from '../middleware/csvtojson';
import isObjectEmpty from '../utils/isObjectEmpty';
import mongoose from 'mongoose';
import authMiddleware from '../middleware/auth';

// @route   GET api/userpreset
// @desc    Get logged in user all presets
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const presets = await Preset.find({ user: req.user.id }).sort({
      number: -1,
    });
    res.json(presets);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/userpreset
// @desc    Add new preset
// @access  Private
router.post(
  '/',
  authMiddleware,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('number', 'Number is required').not().isEmpty(),
    check('month', 'Month is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //validering avklarad

    // destructuring
    const { name, number, month, year, category, type, piggybank } = req.body;

    // build object
    try {
      const newPreset = new Preset({
        name,
        number: type === 'purchase' ? Math.abs(number) : number, // purchase should always be positive number when type purchase
        month,
        year,
        category,
        type,
        piggybank,
        user: req.user.id,
      });

      const preset = await newPreset.save();

      res.json(preset);
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/userpreset/:id
// @desc    Update preset
// @access  Private
router.put('/:id', authMiddleware, async (req, res) => {
  // no :id provided
  if (!req.params.id) {
    return res.status(404).json({ msg: 'No preset id found' });
  }

  // Is the id a valid mongoose id?
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid preset id provided' });
  }

  // check if any fields to update was found
  if (isObjectEmpty(req.body)) {
    return res.status(400).json({ msg: 'Found no fields to update on preset' });
  }
  const { name, number, category, type, piggybank } = req.body;

  // Build preset object
  const presetFields: IUpdatablePresetFields = {
    name,
    number,
    category,
    type,
    piggybank,
  };
  try {
    let preset = await Preset.findById(req.params.id);

    if (!preset) return res.status(404).json({ msg: 'Preset not found' });

    // Make sure user owns preset
    if (preset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    preset = await Preset.findByIdAndUpdate(req.params.id, { $set: presetFields }, { new: true });

    res.json(preset);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/userpreset/:id
// @desc    Delete preset
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ msg: 'No preset id found' });
    }

    // Is the id a valid mongoose id?
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid preset id provided' });
    }

    let preset = await Preset.findById(req.params.id);

    if (!preset) return res.status(404).json({ msg: 'Preset not found' });

    // Make sure user owns preset
    if (preset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Preset.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Preset removed' });
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export = router;
