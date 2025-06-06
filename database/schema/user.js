import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import getConfigs from "../../config/config.js";

const Configs = getConfigs();
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 25,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: [true, "Email ID Required"],
    trim: true,
    unique: [true, "Email ID already exist."],
  },
  mobile: {
    type: String,
    unique: [true, "Mobile Number already exist."],
    trim: true,
    default: null,
  },
  password: { type: String, default: null, trim: true },
  otp: { type: String, trim: true, default: null },
  verify_otp: { type: Boolean, default: false },
  otp_expiry_date: { type: String, trim: true, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

UserSchema.methods.jwtToken = function (next) {
  try {
    return jwt.sign(
      { id: this._id, emailId: this.email },
      Configs.jwt.accessSecret,
      { expiresIn: Configs.jwt.accessOptions.expiresIn || "24hr" }
    );
  } catch (error) {
    return next(error);
  }
};

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
