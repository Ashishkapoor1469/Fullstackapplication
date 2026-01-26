import User from "../models/userModel.js";

export const PLANS = {
  FREE: {
    price: 0,
    tweets: 5,
  },
  GOLD: {
    price: 199,
    tweets: 50,
  },
  PLATINUM: {
    price: 499,
    tweets: Infinity,
  },
};

/* ================= SUBSCRIBE ================= */
export const subscribe = async (req, res) => {
  try {
    const { plan } = req.body;
   
    if (!PLANS[plan]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ⏰ Time restriction (10–11 AM)
    const hour = new Date().getHours();
    if (hour < 10 || hour >= 11) {
      return res.status(403).json({
        message: "Subscription allowed only between 10–11 AM",
      });
    }

    // 💳 Payment simulation
    if (PLANS[plan].price > 0) {
      console.log(`Payment received ₹${PLANS[plan].price}`);
    }

    user.subscription = plan;
    user.tweetsToday = 0;
    user.lastTweetDate = new Date();

    await user.save();

    return res.json({
      success: true,
      subscription: {
        plan: user.subscription,
        tweetsPerDay: PLANS[plan].tweets,
        verified: plan === "PLATINUM",
      },
    });
  } catch (err) {
    console.error("SUBSCRIBE ERROR:", err);
    return res.status(500).json({ message: "Subscription failed" });
  }
};

/* ================= GET CURRENT SUBSCRIPTION ================= */
export const getSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("subscription");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      success: true,
      plan: user.subscription,
      verified: user.subscription === "PLATINUM",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
