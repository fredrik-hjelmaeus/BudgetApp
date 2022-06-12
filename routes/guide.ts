import express, { Request, Response } from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth";
import Preset from "../models/Preset";

// @route   GET api/guide
// @desc    Get guide user presets
// @access  Private
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const presets = await Preset.find({ user: "5fe3319b8062251df4e9e706" }).sort({
      number: -1,
    });
    res.json(presets);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

export = router;
