import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

//REGISTER
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, agreeToTerms } = req.body;

    if (!firstName || !lastName || !email || !password || agreeToTerms !== true) {
      return res.status(400).json({ success: false, message: "All fields are required and terms must be accepted" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      agreeToTerms,
    });

    const savedUser = await newUser.save();
    const userObject = savedUser.toObject();
    delete userObject.password;

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: userObject,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userObject,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// //SEND OTP
// export const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Your OTP",
//       text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
//     });

//     res.status(200).json({ message: "OTP sent successfully" });

//   } catch (error) {
//     console.error("Send OTP error:", error);
//     res.status(500).json({ message: "Error sending OTP", error: error.message });
//   }
// };

// //VERIFY OTP
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
//     if (new Date() > user.otpExpires) return res.status(400).json({ message: "OTP expired" });

//     // Clear OTP after verification
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: "OTP verified successfully" });

//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({ message: "Error verifying OTP", error: error.message });
//   }
// };

// //PASS RESET
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;
//     if (!email || !newPassword) return res.status(400).json({ message: "Email and new password are required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     res.status(200).json({ message: "Password reset successfully" });

//   } catch (error) {
//     console.error("Reset password error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
