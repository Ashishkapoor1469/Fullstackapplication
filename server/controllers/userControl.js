import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import LoginHs from "../models/loginhistory.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js"; 
// 🔥 FIXED: cloudnary → cloudinary

import { setcode, sendEmailcode, verifycode } from "../gen/setCode.js";


// ================= REGISTER USER =================
export const user = async (req, res) => {
  try {
    const { username, fullname, email, password, avatar } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    let avatarData = null; 
    // 🔥 FIXED: const → let

    if (avatar) {
      const upload = await cloudinary.uploader.upload(avatar, {
        folder: "profile",
      });
      avatarData = {
        public_id: upload.public_id,
        url: upload.secure_url,
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      fullname,
      email,
      password: hashPassword,
      avatar: avatarData,
    });

    const code = setcode(newUser); 

    await sendEmailcode(email, "Email Verification", code);

    res.status(201).json({
      message: "User created & verification code sent to email",
      success: true,
      userId: newUser._id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// ================= LOGIN USER =================
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Wrong password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email" });
    }

    const token = user.generateToken();

    const { devicetype, browser, os } = req.deviceinfo || {};
    // 🔥 FIXED: prevent crash if middleware missing

    const hour = new Date().getHours();

    if (devicetype === "mobile" && (hour < 10 || hour > 13)) {
      return res
        .status(403)
        .json({ message: "Mobile allowed only 10AM–1PM" });
    }

    if (browser === "chrome") {
      const code = setcode(user); 
      // 🔥 FIXED

      await sendEmailcode(user.email, "Chrome Login Verification", code);
      // 🔥 FIXED: identifier → user.email

      return res.json({ message: "Verification code sent to email" });
    }

    await LoginHs.create({
      userId: user._id,
      browser,
      os,
      devicetype,
      ipAdsress: req.ip,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Login user" });
  }
};



// ================= VERIFY USER =================
export const verifyUser = async (req, res) => {
  try {
    const { userId, code } = req.body;

    const user = await User.findById(userId); 
    // 🔥 FIXED

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    if (!verifycode(user, code)) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.isVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    const token = user.generateToken();

    res.status(200).json({ message: "User verified successfully", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying user" });
  }
};



// ================= UPDATE USER =================
export const userUpdate = async (req, res) => {
  try {
    const { fullname, bio, avatar } = req.body;

    const updateData = { fullname, bio };

    if (avatar) {
      if (req.user?.avatar?.public_id) {
        await cloudinary.uploader.destroy(req.user.avatar.public_id);
      }

      const upload = await cloudinary.uploader.upload(avatar, {
        folder: "profile",
      });

      updateData.avatar = {
        public_id: upload.public_id,
        url: upload.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    );

    res.status(200).json({ message: "User updated", updatedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};



// ================= LOGIN HISTORY =================
export const LoginHistory = async (req, res) => {
  const history = await LoginHs.find({ userId: req.userId });
  // 🔥 FIXED: req.user.id → req.userId
  res.json(history);
};



// ================= CREATE POST =================
export const UserPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title & content required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.userId,
    });

    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: post._id },
    });

    res.status(201).json({ message: "Post created", post });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};



// ================= FORGET PASSWORD =================
export const UserforgetPass = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const code = setcode(user, 1);
    await user.save();

    await sendEmailcode(email, "Reset Password Code", code, 1);

    res.json({ message: "Reset code sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error changing password" });
  }
};



// ================= RESET PASSWORD =================
export const resetPass = async (req, res) => {
  try {
    const { userId, code, newpassword } = req.body;

    const user = await User.findById(userId);
    // 🔥 FIXED

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    if (!verifycode(user, code)) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.password = await bcrypt.hash(newpassword, 10);
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    const token = user.generateToken();

    res.status(200).json({ message: "Password reset successful", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};



// ================= USER DATA =================
export const userData = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  // 🔥 FIXED

  if (!user) {
    return res.status(404).json({ message: "User Not found" });
  }

  res.status(200).json(user);
};
