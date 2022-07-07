import express, { Express, Request, Response } from "express";
import { IUser } from "../models/User";
import sendEmail from "./sendMail";

const verifyEmail = async (req: Request, res: Response, user: IUser, verifyToken: string) => {
  // send email with verifyEmailToken
  const verifyEmailTokenURL =
    process.env.NODE_ENV === "production"
      ? `${req.protocol}s://${req.get("host")}/verifyemail/${verifyToken}` //`https://budget-app-web.herokuapp.com/resetpassword/${resetToken}`
      : `http://localhost:3000/verifyemail/${verifyToken}`;

  const EmailMessage = `Please click here to verify your email: \n\n ${verifyEmailTokenURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Verify User Email",
      message: EmailMessage,
    });
  } catch (err) {
    console.log(err);
    user.verifyEmailToken = undefined;
    user.verifyEmailExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ errors: [{ msg: "Email verification could not be sent" }] });
  }
};
export default verifyEmail;
