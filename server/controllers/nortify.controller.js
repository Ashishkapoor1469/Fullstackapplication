import User from "../models/userModel.js";

export const toggleNotifications = async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.notificationsEnabled = !user.notificationsEnabled;
  await user.save();

  res.json({
    message: `Notifications ${
      user.notificationsEnabled ? "enabled" : "disabled"
    }`,
    success: true,
    enabled: user.notificationsEnabled,
  });
};
