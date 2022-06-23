import express, { Request, Response } from "express";
const router = express.Router();
import path from "path";

// @route   GET /about
// @desc    Get about page
// @access  Public
router.get("/", async (req: Request, res: Response) => {
  console.log(__dirname);
  res.send("About");
  //res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
});

export = router;
