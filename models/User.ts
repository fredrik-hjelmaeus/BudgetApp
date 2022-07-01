import mongoose from "mongoose";
import crypto from "crypto";

export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IUserInput, mongoose.Document {
  verifiedEmail: boolean;
  date: Date;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  verifyEmailToken: string | undefined;
  verifyEmailExpire: Date | undefined;
  getResetPasswordToken(): string;
  getVerifyEmailToken(): string;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verifiedEmail: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verifyEmailToken: String,
  verifyEmailExpire: Date,
});

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function (): string {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Generate and hash verifyEmail-token
UserSchema.methods.getVerifyEmailToken = function (): string {
  // Generate token
  const verifyToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.verifyEmailToken = crypto.createHash("sha256").update(verifyToken).digest("hex");

  // Set expire
  this.verifyEmailExpire = Date.now() + 10 * 60 * 1000;

  return verifyToken;
};

//module.exports = mongoose.model('user', UserSchema);
export default mongoose.model<IUser>("User", UserSchema);
