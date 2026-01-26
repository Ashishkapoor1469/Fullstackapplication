import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    password: {
      type: String,
      select: false, // keep password hidden in normal queries
      required: function () {
        return this.provider === "local";
      },
    },

    bio: {
      type: String,
      default: "",
    },

    avatar: {
      type: String, // image URL
      public_id: String,
      default: "",
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },

    subscription: {
      type: String,
      enum: ["FREE", "BRONZE", "SILVER", "GOLD"],
      default: "FREE",
    },
    tweetsToday: {
      type: Number,
      default: 0,
    },
    lastTweetDate: {
      type: Date,
    },
    emailVerificationCode: String,
    emailVerificationExpires: Date,
    lastPasswordChangedAt: {
      type: Date,
    },

    googleId: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// ================= TOKEN GENERATOR =================
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id.toString(),
      role: this.isAdmin ? "admin" : "user",
      type: "AUTH",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

// ================= PASSWORD CHECK =================
userSchema.methods.matchPassword = function (pass) {
  if (!this.password) {
    throw new Error("Password not loaded. Use .select('+password') in query");
  }
  return bcrypt.compare(pass, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
