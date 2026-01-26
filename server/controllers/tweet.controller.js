import { PLANS } from "./subscription.controller.js";

export const checkTweetLimit = async (req, res, next) => {
  const user = req.user; // from auth middleware

  const today = new Date().toDateString();

  // Reset count if new day
  if (
    !user.lastTweetDate ||
    new Date(user.lastTweetDate).toDateString() !== today
  ) {
    user.tweetsToday = 0;
  }

  const planLimit = PLANS[user.subscription]?.tweets;

  if (user.tweetsToday >= planLimit) {
    return res.status(403).json({
      message: `Tweet limit reached for ${user.subscription} plan`,
    });
  }

  user.tweetsToday += 1;
  user.lastTweetDate = new Date();
  await user.save();

  next();
};
