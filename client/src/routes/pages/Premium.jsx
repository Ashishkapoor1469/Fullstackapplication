import { useEffect, useState } from "react";
import PremiumCard from "../../components/ui/PremiumCard";
import VerifiedBadge from "../../components/ui/verifycard";
import { GetUser, PostUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { Loader } from "../../components/ui";

export default function Premium() {
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgradingPlan, setUpgradingPlan] = useState(null);
  const { showToast } = useToast();
  //  Load from cache first
  useEffect(() => {
    const cached = localStorage.getItem("subscription");

    if (cached) {
      setPremium(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await GetUser("subscribe");

      if (res.success) {
        const data = {
          plan: res.plan,
          verified: res.verified,
        };

        setPremium(data);
        localStorage.setItem("subscription", JSON.stringify(data));
      } else {
        showToast(res.message || "Failed to load subscription", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load subscription", "error");
    } finally {
      setLoading(false);
    }
  };

  const upgrade = async (plan) => {
    try {
      setUpgradingPlan(plan);
      const token = localStorage.getItem("token");

      const res = await PostUser("subscribe", { plan }, token);

      if (res.success) {
        const data = {
          plan,
          verified: plan === "PLATINUM",
        };

        setPremium(data);
        localStorage.setItem("subscription", JSON.stringify(data));

        showToast(`Subscribed to ${plan} 🎉`, "success");
      } else {
        showToast(res.message || "Subscription failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Subscription error ❌", "error");
    }finally {
    setUpgradingPlan(null); // stop loading after request
  }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!premium) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">Premium</h1>
      <p className="text-gray-400 mb-8">
        Get more from X with exclusive features
      </p>

      {/* Current plan */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-gray-400 text-sm">Current plan:</span>
        <span className="font-bold">{premium.plan}</span>
        {premium.subscription && <VerifiedBadge />}
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-6">
        <PremiumCard
          title="FREE"
          price="₹0"
          active={premium.plan === "FREE"}
          loading={upgradingPlan === "FREE"}
          features={["1 tweet per day", "Ads enabled", "Basic feed"]}
        />

        <PremiumCard
          title="GOLD"
          price="₹300 / month"
          loading={upgradingPlan === "GOLD"}
          active={premium.plan === "GOLD"}
          onSelect={() => upgrade("GOLD")}
          features={["3 tweets per day", "No ads", "Analytics"]}
        />

        <PremiumCard
          title="PLATINUM"
          price="₹1000 / month"
         loading={upgradingPlan === "PLATINUM"}
          active={premium.plan === "PLATINUM"}
          onSelect={() => upgrade("PLATINUM")}
          features={["Unlimited tweets", "Verified badge", "Priority ranking"]}
        />
      </div>
    </div>
  );
}
