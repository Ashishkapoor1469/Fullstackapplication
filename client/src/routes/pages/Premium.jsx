import { useEffect, useState } from "react";
import PremiumCard from "../../components/ui/PremiumCard";
import VerifiedBadge from "../../components/ui/verifycard";
import { GetUser, PostUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { Loader } from "../../components/ui";
import { useTranslation } from "react-i18next";

export default function Premium() {
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgradingPlan, setUpgradingPlan] = useState(null);
  const { showToast } = useToast();
  const { t } = useTranslation();
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
    } finally {
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
      <h1 className="text-3xl font-bold mb-2">{t("premium.title")}</h1>
      <p className="text-gray-400 mb-8">{t("premium.subtitle")}</p>

      {/* Current plan */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-gray-400 text-sm">
          {t("premium.currentPlan")}:
        </span>
        <span className="font-bold">{premium.plan}</span>
        {premium.subscription && <VerifiedBadge />}
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-6">
        <PremiumCard
          title={t("premium.free")}
          price="₹0"
          active={premium.plan === "FREE"}
          loading={upgradingPlan === "FREE"}
          features={[
            t("premium.tweetLimit1"),
            t("premium.adsEnabled"),
            t("premium.basicFeed"),
          ]}
        />

        <PremiumCard
          title={t("premium.gold")}
          price="₹300 / month"
          active={premium.plan === "GOLD"}
          loading={upgradingPlan === "GOLD"}
          onSelect={() => upgrade("GOLD")}
          features={[
            t("premium.tweetLimit3"),
            t("premium.noAds"),
            t("premium.analytics"),
          ]}
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
