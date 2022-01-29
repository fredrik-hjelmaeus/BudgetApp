import mongoose from 'mongoose';
import crypto from 'crypto';

export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IUserInput, mongoose.Document {
  date: Date;
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  getResetPasswordToken(): string;
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
});

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function (): string {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//module.exports = mongoose.model('user', UserSchema);
export default mongoose.model<IUser>('User', UserSchema);
