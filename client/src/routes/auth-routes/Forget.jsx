import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { PostUser } from "../../auth/auth";
export default function Forget() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const res = await PostUser("user/forget", { email });

      // 🔥 IMPORTANT: store verification data
      if (res?.success) {
        localStorage.setItem("verifyType", "EMAIL");
        localStorage.setItem("verifyValue", email);
        localStorage.setItem("ForgetPass", "RESET");
        showToast("Verification code sent 📩", "success");
        navigate("/verify-email", { replace: true });
      } else {
        showToast(res.message || "Error sending code", "error");
      }

      // 🔥 Redirect to existing verify page
    } catch (err) {
      showToast("Failed to send code ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen selection:text-pretty selection:bg-orange-400/20 bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-2xl p-8 text-white">
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-bold">X</span>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">
          Find your X account
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the email associated with your account to change your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            disabled={!email || loading}
            className="w-full bg-[#1DA1F2] hover:bg-blue-600 disabled:opacity-50
                       transition py-2.5 rounded-full font-semibold flex justify-center"
          >
            {loading ? <Loader className="animate-spin" size={18} /> : "Next"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
