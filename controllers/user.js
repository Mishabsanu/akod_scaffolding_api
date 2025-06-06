import catchAsync from "../errors/catchAsync.js";
import { create, verify } from "../utils/authServices/index.js";
import getConfigs from "../config/config.js";
import UserModel from "../database/schema/user.js";
const Configs = getConfigs();

export const SignUp = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      result: [],
      status: false,
      message: "Email and password are required",
    });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      result: [],
      status: false,
      message: "User already exists with this email",
    });
  }

  const hashedPassword = await create(password);

  const newUser = new UserModel({
    ...req.body,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  return res.status(201).json({
    result: savedUser,
    status: true,
    message: "User registered successfully",
  });
});

export const SignIn = catchAsync(async (req, res, next) => {
  const origin = req.get("Origin");
  const { email, password } = req.body;
  if (!email)
    return res.status(400).json({
      result: [],
      status: false,
      message: "Email ID is Required",
    });

  if (!password)
    return res.status(400).json({
      result: [],
      status: false,
      message: "Passowrd is Required",
    });

  const user = await UserModel.findOne({ email: email }).select(
    "-otp -verify_otp -otp_expiry_date"
  );

  if (!user) {
    return res.status(401).json({
      result: [],
      status: false,
      message: "User not found with this email Id.",
    });
  }
  if (user.status == false) {
    return res.status(401).json({
      result: [],
      status: false,
      message: "You are Blocked By Admin",
    });
  }
  const passwordHash = user.password;
  const passwordMatch = await verify(password, passwordHash);

  if (!passwordMatch) {
    return res
      .status(401)
      .json({ result: [], status: false, message: "Password is InValid" });
  }

  const token = user.jwtToken(next);
  const options = {
    expires: new Date(
      Date.now() + Configs.cookie.cookie_expire * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Credentials", "true");

  return res.status(200).cookie("token", token, options).json({
    token,
    result: user,
    status: true,
    message: "Login successfully.",
  });
});
