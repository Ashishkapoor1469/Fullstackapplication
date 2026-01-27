import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";
import LoginHs from "../models/loginhistory.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // 🔴 Guard
    if (!token) {
      return res.status(400).json({ message: "Google token missing" });
    }

    // ✅ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google account" });
    }

    let user = await User.findOne({ email });

    // 🟢 CREATE USER IF NOT EXISTS
    if (!user) {
      const baseUsername = email.split("@")[0];
      const random = Math.floor(1000 + Math.random() * 9000);

      user = await User.create({
        username: `${baseUsername}${random}`,
        fullname: name,
        email,
        avatar: picture,
        provider: "google",
        isVerified: true,
      });
    }

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

    await LoginHs.create({
      userId: user._id,
      browser,
      os,
      devicetype,
      ipAdsress: req.ip,
    });

    // 🔐 Generate JWT
    const jwtToken = user.generateToken();

    res.status(200).json({
      success: true,
      token: jwtToken,
      user,
      userId: user._id,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
