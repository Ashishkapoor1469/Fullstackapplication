import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcrypt from "bcryptjs";
import cloudnary from "../utils/cloudnary.js";
import gen from "../gen/codegen.js";
import { resend } from "../utils/resend.js";

// ================= REGISTER USER =================
export const user = async (req, res) => {
  try {
    const { username, fullname, email, password, avatar } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const avatarData = null;
    if (avatar) {
      const upload = await cloudnary.uploader.upload(avatar, {
        folder: "profile",
      });
      avatarData = {
        public_id: upload.public_id,
        url: upload.secure_url,
      };
    }
    const code = gen();
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      fullname,
      email,
      password: hashPassword,
      avatar: avatarData,
      emailVerificationCode: code,
      emailVerificationExpires: Date.now() + 1 * 60 * 60 * 1000,
    });

    await resend.emails.send({
      from: "MyApp <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code",
      html: `<h2>Email Verification</h2>
      <p>Your verification code is:</p>
      <h1>${code}</h1>
      <p>Expires in 10 minutes</p>`,
    });

    // Generate Token
    // const token = newUser.generateToken(); // fixed

    res.status(201).json({
      message:
        "user created & verification code Sented in user Email [--Please verify your Email now--]",
      // token,
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err}` });
  }
};

// ================= VERIFY USER =================

export const verifyUser = async (req, res) => {
  try {
    const { userId, code } = req.body;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    if (
      user.emailVerificationCode !== code ||
      user.emailVerificationExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid OR Expired verify code" });
    }
    user.isVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefiend;
    await user.save();

    // Generate Token
    const token = user.generateToken(); // fixed

    res.status(201).json({ message: "User verified successfully", token });
  } catch (error) {
    res.status(500).json({ message: `Error verifying user ${error}` });
  }
};

// ================= UPDATE USER =================
export const userUpdate = async (req, res) => {
  try {
    const { fullname, bio, avatar } = req.body;
    const updateData = { fullname, bio };

    if (avatar) {
      if (req.user.avatar?.public_id) {
        await cloudnary.uploader.destroy(req.user.avatar.public_id);
      }
      const upload = await cloudnary.uploader.upload(avatar, {
        folder: "profile",
      });
      updateData.avatar = {
        public_id: upload.public_id,
        url: upload.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
    });

    res.status(200).json({ message: "user updated", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

// ================= CREATE A POST =================
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
    res.status(500).json({ message: "Error creating post" });
  }
};

export const UserforgetPass = async (req, res) => {
  res.send("forget password API soon");
};

// test API
export const JJ = async (req, res) => {
  res.json({ message: "Hello from server" });
};
