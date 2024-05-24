import { json } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

import { sendCookie } from "../utils/features.js";
import Errorhandler from "../middlewares/error.js";

export const getusers = async (req, res) => {};

export const getmyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); //email is not exist

    if (!user) return next(new Errorhandler("Invalid email or password", 400));
    // if (!user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email or password",
    //   });

    const ismatch = await bcrypt.compare(password, user.password); //password or email doesn't match
    if (!ismatch)
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    sendCookie(user, res, `welcome,${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email }); //find the user by help of email
    // if (user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "user Already Exists",
    //   });

    if (user) return next(new Errorhandler("user Already Exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10); //create normal password to hash password

    user = await User.create({ name, email, password: hashedPassword }); //create user
    // const token = jwt.sign({ _id: user._id }, process.env.JWt_SECRETE); //generate random user_id

    // res
    //   .status(201)
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     maxAge: 15 * 60 * 1000, //cookies timeout time
    //   })
    //   .json({
    //     success: true,
    //     message: "Registed successfully", //if your registereed succeesfully
    //   });
    sendCookie(user, res, "Registered successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: req.user,
    });
};
