import { useState } from "react";
import { Loader, Eye, EyeOff } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { PostUser } from "../../auth/auth";

export default function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      return showToast("All fields are required", "error");
    }

    if (password !== confirm) {
      return showToast("Passwords do not match", "error");
    }
    if (password.length < 8) {
      return showToast("Password must be at least 8 characters long", "error");
    }

    const strongPassword =
      /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);

    if (!strongPassword) {
      return showToast(
        "Password must include uppercase, lowercase and number",
        "error",
      );
    }
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await PostUser(
        "user/reset",
        { newpassword: password },
        token,
      );

      if (res.success) {
        showToast("Password changed successfully 🔐", "success");
      } else {
        showToast(res.message || "Reset failed", "error");
      }
    } catch (err) {
      showToast("Something went wrong ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-black z-10 px-4 py-3 border-b">
        <h1 className="text-xl font-bold">Reset password</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-400 mb-6 text-sm">
          Choose a strong password you haven’t used before.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New password */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-3 text-gray-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm password */}
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={loading}
            className="w-full bg-[#1DA1F2] hover:bg-blue-600 disabled:opacity-50
                       transition py-3 rounded-full font-semibold flex justify-center"
          >
            {loading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              "Reset password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
