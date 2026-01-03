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
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },

    avatar: {
      // <-- image field added

      type: String, // store image URL (recommended)
      public_id: String,
      default: "",
    },

    posts: [
      // renamed to plural (recommended)
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationCode: String,
    emailVerificationExpires: Date,

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ================= TOKEN GENERATOR =================
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
      avatar: this.avatar,
      isAdmin: this.isAdmin,
      isVerified: this.isVerified,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// ================= PASSWORD CHECK =================
userSchema.methods.matchPassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
