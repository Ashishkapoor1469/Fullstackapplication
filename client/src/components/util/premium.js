const DEFAULT_PLAN = {
  plan: "FREE",
  verified: false,
  dailyLimit: 5,
};

export const getPremium = () => {
  return (
    JSON.parse(localStorage.getItem("premium")) || DEFAULT_PLAN
  );
};

export const setPremium = (plan) => {
  let data = DEFAULT_PLAN;

  if (plan === "GOLD") {
    data = {
      plan: "GOLD",
      verified: false,
      dailyLimit: 50,
    };
  }

  if (plan === "PLATINUM") {
    data = {
      plan: "PLATINUM",
      verified: true,
      dailyLimit: Infinity,
    };
  }

  localStorage.setItem("premium", JSON.stringify(data));
  return data;
};
