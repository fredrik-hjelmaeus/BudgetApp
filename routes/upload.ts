import express, { Request, Response } from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth";
import csvtojson from "../middleware/csvtojson";

// @route   POST api/userpreset/upload
// @desc    Add new presets with csv file
// @access  Private
router.post("/", authMiddleware, csvtojson, async (req: Request, res: Response) => {
  try {
    console.log("req.newpresets:", req.newpresets);
    res.json(req.newpresets);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    if (!res.headersSent) {
      res.status(500).send("Server Error");
    }
  }
});
export = router;

// test change
