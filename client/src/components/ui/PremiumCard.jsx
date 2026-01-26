import { Loader } from "lucide-react";

export default function PremiumCard({
  title,
  price,
  features,
  active,
  onSelect,
  loading
}) {
  return (
    <div
      className={`border rounded-2xl p-6 transition ${
        active
          ? "border-[#1DA1F2] bg-[#1DA1F2]/10"
          : "border-gray-800 hover:border-gray-600"
      }`}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-2xl font-extrabold my-2">{price}</p>

      <ul className="space-y-2 text-sm text-gray-300 my-4">
        {features.map((f, i) => (
          <li key={i}>✔ {f}</li>
        ))}
      </ul>

      {active ? (
        <button className="w-full py-2 rounded-full bg-gray-700 cursor-not-allowed">
          Current Plan
        </button>
      ) : (
        <button
          onClick={onSelect}
          className="w-full py-2 rounded-full bg-[#1DA1F2] hover:bg-[#1A8CD8]"
        >
        {loading?<Loader className="text-center w-full animate-spin"/>:"Upgrade"}  
        </button>
      )}
    </div>
  );
}
