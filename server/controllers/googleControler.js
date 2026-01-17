import { OAuth2Client } from "google-auth-library";
import User from "../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        fullname: name,
        avatar: { url: picture },
        isVerified: true,
      });
    }

    const jwtToken = user.generateToken();

    res.status(200).json({
      token: jwtToken,
      user,
    });
  } catch (error) {
    res.status(401).json({ message: "Google authentication failed" });
  }
};
