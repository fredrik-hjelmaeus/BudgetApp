import express, { Request, Response } from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "config";
import { check, validationResult } from "express-validator";
import authMiddleware from "../middleware/auth";
import sendEmail from "../utils/sendEmail";
import sendMail from "../utils/sendEmailwithSendInBlue";

import User, { IUser } from "../models/User";
import verifyEmail from "../utils/verifyEmail";

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Private
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
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
    //destructuring
    const { email, password } = req.body;

    try {
      // try fetch user by email from db
      let user = await User.findOne({ email });

      // if no user found in db
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // if email is not verified
      if (!user.verifiedEmail) {
        return res.status(400).json({ errors: [{ msg: "Email is not verified" }] });
      }

      // check that provided password matches fetched user from dbs password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // create object that will be input to jwt.sign
      const payload = {
        user: {
          id: user.id,
        },
      };

      //react native check
      //react native ska inte ha en expiration på sitt auth då det är en mobilapp
      if (myAgent && myAgent === "react") {
        jwt.sign(
          payload,
          process.env.jwtSecret!,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        jwt.sign(payload, process.env.jwtSecret!, (err, token) => {
          if (err) throw err;

          res.json({ token });
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      res.status(400).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @route   POST api/auth/forgotpassword
// @desc    Forgot password
// @access  Public
router.post(
  "/forgotpassword",
  [check("email", "Please include a valid email").isEmail()],
  async (req: Request, res: Response) => {
    //validate : check if a valid mail syntax was used
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ errors: [{ msg: "There is no user with that email" }] });
      }

      // Get reset token
      const resetToken = user.getResetPasswordToken();

      await user.save({ validateBeforeSave: false });

      // Create frontend-reset url
      const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/forgotpassword/${resetToken}`;
      const resetUrlTwo =
        process.env.NODE_ENV === "production"
          ? `${req.protocol}s://${req.get("host")}/resetpassword/${resetToken}` //`https://budget-app-web.herokuapp.com/resetpassword/${resetToken}`
          : `http://localhost:3000/resetpassword/${resetToken}`;

      const message = `You are receiving this email because you (or someone else) has 
                     requested the reset of a password. Please follow this link to 
                     create new password: \n\n ${resetUrlTwo}`;
      try {
        await sendEmail({
          email: user.email,
          subject: "Password reset token",
          message,
        });

        return res.status(200).json({ success: true, data: "Email sent" });
      } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({ errors: [{ msg: "Email could not be sent" }] });
      }

      // res.status(200).json({ msg: 'Email sent, check your mailbox', data: user });
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);

      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @desc          Reset Password
// @route         PUT /api/auth/resetpassword/:resettoken
// @access        Public
router.put(
  "/resetpassword/:resettoken",
  check("password", "The password must be 6+ chars long and contain a number")
    .exists()
    .isLength({ min: 6 })
    .withMessage("must be at least 6 chars long")
    .matches(/\d/),
  async (req: Request, res: Response) => {
    //validate : check if a valid mail syntax was used
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Get hashed token
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resettoken)
        .digest("hex");

      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Expired or Invalid token" }] });
      }

      // Set/Encrypt new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(200).json("Password Changed");
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @desc          Update user details
// @route         PUT /api/auth/updatedetails
// @access        Private
router.put(
  "/updatedetails",
  authMiddleware,
  [check("email", "Please include a valid email").isEmail()],
  async (req: Request, res: Response) => {
    //validering
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // make sure new requested email is not already in use
      const emailInUse = await User.findOne({ email: req.body.email });
      // if it exist a user with that email and it's not the id of the authenticated user ,cancel change
      if (emailInUse && emailInUse.id !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: "This email is already in use" }] });
      }

      // extract information from request
      // if user did not provide a name field to update,adapt object fields
      const fieldsToUpdate =
        typeof req.body.name !== "undefined"
          ? { name: req.body.name, email: req.body.email }
          : { email: req.body.email };

      // update user
      const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
      }).select("-password");

      res.status(200).json({
        success: true,
        data: user,
        msg: "Successfully updated profile",
      });
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @desc          Update password
// @route         PUT /api/auth/updatepassword
// @access        Private
router.put(
  "/updatepassword",
  [
    check("password", "The password must be 6+ chars long and contain a number")
      .exists()
      .isLength({ min: 6 })
      .withMessage("must be at least 6 chars long")
      .matches(/\d/),
  ],
  authMiddleware,
  async (req: Request, res: Response) => {
    //validering
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "No User found" }] });
      }

      // Check current password
      if (!(await bcrypt.compare(req.body.currentPassword, user.password))) {
        return res.status(401).json({ errors: [{ msg: "Current Password is incorrect" }] });
      }

      // Set/Encrypt new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();
      res.status(200).json({ msg: "Password Updated" });
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// @desc    Send email verification
// @route   POST api/auth/sendemailverification
// @access  Public
router.post("/sendemailverification", async (req, res) => {
  // get user email
  const user = await User.findOne({ email: req.body.email });
  // if not exist, 400
  if (!user) {
    return res.status(404).json({ errors: [{ msg: "There is no user with that email" }] });
  }
  // if already verified, 400
  if (user.verifiedEmail) {
    return res.status(400).json({ errors: [{ msg: "User is already verified" }] });
  }
  // create verifyEmailToken on user and save
  const verifyToken: string = user.getVerifyEmailToken(false);
  await user.save();

  // send email with verifyEmailToken
  await verifyEmail(req, res, user, verifyToken);

  // return 200
  res.status(200).json({ msg: "Email Verification Sent" });
});

// @desc          Verify email/user
// @route         PUT /api/auth/verifyemail/:verifytoken
// @access        Private via temp-token
router.put("/verifyemail/:verifytoken", async (req, res) => {
  try {
    // get token from params
    // Get hashed token
    const verifyEmailToken = crypto
      .createHash("sha256")
      .update(req.params.verifytoken)
      .digest("hex");

    const user = await User.findOne({
      verifyEmailToken,
      verifyEmailExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Expired or Invalid token" }] });
    }

    // set verifyEmail to true
    user.verifiedEmail = true;

    user.verifyEmailToken = undefined;
    user.verifyEmailExpire = undefined;
    await user.save();

    res.status(200).json(user.verifiedEmail);
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
  // if no token, 400
  // verify token
  // if not verified, 400
  // if verified, update userfield verifiedEmail:true in db.
  // send user to webpage confirming email is verified
});

// TEMP
// @route   POST api/auth/sendinblue
// @desc    Forgot password
// @access  Public
router.post(
  "/sendinblue",
  [check("email", "Please include a valid email").isEmail()],
  async (req: Request, res: Response) => {
    //validate : check if a valid mail syntax was used
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({ errors: [{ msg: "There is no user with that email" }] });
      }

      // Get reset token
      const resetToken = user.getResetPasswordToken();

      await user.save({ validateBeforeSave: false });

      // Create reset url
      const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/forgotpassword/${resetToken}`;
      const resetUrlTwo =
        process.env.NODE_ENV === "production"
          ? `https://budget-app-web.herokuapp.com/resetpassword/${resetToken}`
          : `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;

      const message = `You are receiving this email because you (or someone else) has 
                     requested the reset of a password. Please follow this link to 
                     create new password: \n\n ${resetUrlTwo}`;
      try {
        const sender = {
          email: "gemigpost@hotmail.com",
          name: "Fred",
        };
        const receivers = {
          email: user.email,
        };
        const sibResponse = await sendMail(sender, receivers, "Password Reset Request", message);

        return res.status(200).json({ success: true, data: "Email sent" });
      } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({ errors: [{ msg: "Email could not be sent" }] });
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

export = router;
