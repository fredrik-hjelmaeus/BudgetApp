import express, { Request, Response } from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

import User from "../models/User";

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check("password", "The password must be 6+ chars long and contain a number")
      .exists()
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .matches(/\d/),
  ],
  async (req: Request, res: Response) => {
    const myAgent = req.header("my_user-agent");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // input validation is completed

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // if user exist, report errormsg
      if (user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // if user mail don't exist, create a new user
      user = new User({
        name,
        email,
        password,
      });

      // encrypt password
      // salt is the time/quality of hash encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      //react native check
      //react native should not have an expiration date in token,since it's a mobile app.
      if (myAgent && myAgent === "react") {
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
          }
        );
      } else {
        jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
          if (err) throw err;
          res.status(201).json({ token });
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

export = router;
