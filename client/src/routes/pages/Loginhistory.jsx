import { useEffect, useState } from "react";
import { GetUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
export default function LoginHs() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let toastShown = false;
        const res = await GetUser("user/login-history");
        setHistory(res.history);

        if (!toastShown) {
          showToast(res.message || "LATEST 4 LOGIN", "info");
          toastShown = true;
        }
      } catch (err) {
        console.error("Failed to load login history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p className="text-center p-6 text-gray-400">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 text-white">
      <h1 className="text-xl font-bold mb-4">Login Activity</h1>

      {history.length === 0 && (
        <p className="text-gray-400">No login activity found</p>
      )}

      {history.map((item) => (
        <div
          key={item._id}
          className="border border-gray-800 rounded-xl p-4 mb-3"
        >
          <p className="text-sm">
            <span className="font-semibold">Device:</span>{" "}
            {item.devicetype || "Unknown"}
          </p>

          <p className="text-sm">
            <span className="font-semibold">Browser:</span>{" "}
            {item.browser || "Unknown"}
          </p>

          <p className="text-sm">
            <span className="font-semibold">OS:</span> {item.os || "Unknown"}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {new Date(item.loginAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
