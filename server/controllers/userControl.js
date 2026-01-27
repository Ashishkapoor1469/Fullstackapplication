import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import LoginHs from "../models/loginhistory.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
import { setcode, sendEmailcode, verifycode } from "../gen/setCode.js";
import { canChangePassword } from "../gen/lastchange.js";

/* ================= REGISTER USER ================= */
export const user = async (req, res) => {
  try {
    const { username, fullname, email, password, avatar } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let avatarData = null;

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

    const newUser = new User({
      username,
      fullname,
      email,
      password: hashPassword,
      avatar: avatarData,
    });

    // ✅ generate + save verification code
    const code = setcode(newUser);
    await newUser.save();

    // ✅ email failure should NOT break registration
    try {
      await sendEmailcode(email, "Email Verification", code);
    } catch (mailErr) {
      console.error("Email send failed:", mailErr);
    }

    return res.status(201).json({
      message: "User created. Verification code sent.",
      success: true,
      userId: newUser._id,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN USER ================= */
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    /* ================= VALIDATION ================= */
    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    /* ================= FIND USER ================= */
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userpass = user.password;
    console.log(userpass);

    if (!userpass) {
      return res.status(500).json({
        message: "User password missing. Please reset password.",
      });
    }

    /* ================= PASSWORD CHECK ================= */
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({ message: "Wrong password" });
    }

    /* ================= EMAIL VERIFIED ================= */
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ step: "VERIFY_EMAIL", message: "Please verify your email" });
    }

    /* ================= DEVICE INFO ================= */
    const device = req.deviceinfo || {};
    const devicetype = device.devicetype || "unknown";
    const browser = device.browser || "unknown";
    const os = device.os || "unknown";

    // Get current time in IST
    const now = new Date();
    const utcHour = now.getUTCHours(); // server UTC hour
    const utcMinute = now.getUTCMinutes(); // server UTC minutes

    // Convert UTC to IST (UTC+5:30)
    let istHour = utcHour + 5;
    let istMinute = utcMinute + 30;

    // Adjust overflow if hour >= 24
    if (istMinute >= 60) {
      istMinute -= 60;
      istHour += 1;
    }
    if (istHour >= 24) {
      istHour -= 24;
    }

    // Mobile login rule 10AM–1PM
    if (
      devicetype.toLowerCase() === "mobile" &&
      (istHour < 10 || istHour > 13)
    ) {
      return res
        .status(403)
        .json({ message: "Mobile login allowed 10AM–1PM only" });
    }
    /* ================= CHROME VERIFICATION ================= */
    if (browser.toLowerCase() === "chrome") {
      const code = setcode(user);
      await user.save();

      await sendEmailcode(user.email, "Chrome Login Verification", code);

      return res.status(200).json({
        message: "Verification code sent to email",
        step: "VERIFY_CHROME",
        userId: user._id,
      });
    }

    /* ================= NORMAL LOGIN ================= */
    const token = user.generateToken();

    await LoginHs.create({
      userId: user._id,
      browser,
      os,
      devicetype,
      ipAdsress: req.ip,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

/* ================= VERIFY USER ================= */
export const verifyUser = async (req, res) => {
  try {
    const { identifier, code } = req.body;

    if (!identifier || !code) {
      return res.status(400).json({ message: "Identifier and code required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!verifycode(user, code)) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.isVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    const token = user.generateToken();

    res.status(200).json({
      message: "Email verified successfully",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

/* ================= UPDATE USER ================= */
export const userUpdate = async (req, res) => {
  try {
    const { fullname, bio, avatar } = req.body;

    const updateData = { fullname, bio };

    if (avatar) {
      const user = await User.findById(req.userId);

      if (user?.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      const upload = await cloudinary.uploader.upload(avatar, {
        folder: "profile",
      });

      updateData.avatar = {
        public_id: upload.public_id,
        url: upload.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({ message: "User updated", updatedUser });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};

/* ================= LOGIN HISTORY ================= */
export const LoginHistory = async (req, res) => {
  try {
    const history = await LoginHs.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    return res.json({
      history,
      message: "login history",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE POST ================= */
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

    return res.status(201).json({ message: "Post created", post });
  } catch (error) {
    console.error("POST ERROR:", error);
    return res.status(500).json({ message: "Error creating post" });
  }
};

/* ================= FORGET PASSWORD ================= */
export const UserforgetPass = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.provider === "google" || user.googleId) {
      return res.status(403).json({
        message:
          "This account uses Google sign-in. Password reset is disabled.",
      });
    }
    const code = setcode(user, 1);
    await user.save();

    try {
      await sendEmailcode(email, "Reset Password Code", code, 1);
    } catch (err) {
      console.error("Reset mail error:", err);
    }

    return res.json({ success: true, message: "Reset code sent" });
  } catch (err) {
    console.error("FORGET ERROR:", err);
    return res.status(500).json({ message: "Error changing password" });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPass = async (req, res) => {
  try {
    const { newpassword } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.provider === "google" || user.googleId) {
      return res.status(403).json({
        message:
          "This account uses Google sign-in. Password reset is disabled.",
      });
    }
    if (!canChangePassword(user.lastPasswordChangedAt)) {
      return res.status(403).json({
        message: "You can change your password only once per day",
      });
    }

    user.password = await bcrypt.hash(newpassword, 10);
    user.lastPasswordChangedAt = new Date();

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("RESET ERROR:", error);
    return res.status(500).json({ message: "Error resetting password" });
  }
};

/* ================= USER DATA ================= */
export const userData = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
};
