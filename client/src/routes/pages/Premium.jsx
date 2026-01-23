import { useEffect, useState } from "react";
import PremiumCard from "../../components/ui/PremiumCard";
import VerifiedBadge from "../../components/ui/verifycard";
import { getPremium, setPremium } from "../../components/util/premium";

export default function Premium() {
  const [premium, setPremiumState] = useState(null);

  useEffect(() => {
    setPremiumState(getPremium());
  }, []);

  const upgrade = (plan) => {
    const updated = setPremium(plan);
    setPremiumState(updated);
  };

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
        {premium.verified && <VerifiedBadge />}
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-6">
        <PremiumCard
          title="FREE"
          price="₹0"
          active={premium.plan === "FREE"}
          features={["5 tweets per day", "Ads enabled", "Basic feed"]}
        />

        <PremiumCard
          title="GOLD"
          price="₹199 / month"
          active={premium.plan === "GOLD"}
          onSelect={() => upgrade("GOLD")}
          features={["50 tweets per day", "No ads", "Analytics"]}
        />

        <PremiumCard
          title="PLATINUM"
          price="₹499 / month"
          active={premium.plan === "PLATINUM"}
          onSelect={() => upgrade("PLATINUM")}
          features={["Unlimited tweets", "Verified badge", "Priority ranking"]}
        />
      </div>
    </div>
  );
}
