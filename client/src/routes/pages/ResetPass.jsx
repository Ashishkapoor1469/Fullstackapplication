import { useState } from "react";
import { Loader, Eye, EyeOff, Lock, ChevronLeft } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { PostUser } from "../../auth/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      return showToast("Password must be at least 8 characters", "error");
    }

    const strongPassword =
      /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);

    if (!strongPassword) {
      return showToast("Include uppercase, lowercase, and a number", "error");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await PostUser(
        "user/reset",
        { newpassword: password },
        token,
      );

      if (res.success) {
        showToast("Password changed successfully 🔐", "success");
        setPassword("");
        setConfirm("");
      } else {
        showToast(res.message || "Reset failed", "error");
      }
    } catch {
      showToast("Something went wrong ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen text-white">
      {/* Header */}
      <header className="sticky flex gap-2 top-0 z-10 bg-black/70 backdrop-blur border-b border-neutral-800 px-4 py-3">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
        <div>
          <h1 className="text-lg font-bold">{t("resetPassword.title")}</h1>
          <p className="text-xs text-gray-400">{t("resetPassword.subtitle")}</p>
        </div>
      </header>

      {/* Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-3.5 text-gray-500" />
            <input
              type={showPass ? "text" : "password"}
              placeholder={t("resetPassword.newPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-neutral-700 rounded-xl
                         pl-10 pr-10 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-3 text-gray-400 hover:text-white"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder={t("resetPassword.confirmPassword")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-transparent border border-neutral-700 rounded-xl
                         px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-3 text-gray-400 hover:text-white"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password hint */}
          <p className="text-xs text-gray-500 leading-relaxed">
            Must be at least <span className="text-gray-300">8 characters</span>{" "}
            and include{" "}
            <span className="text-gray-300">uppercase, lowercase,</span> and{" "}
            <span className="text-gray-300">a number</span>.
          </p>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full mt-4 bg-[#1DA1F2] hover:bg-blue-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition py-3 rounded-full font-semibold
                       flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Updating…
              </>
            ) : (
              t("resetPassword.submit")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
