import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { Loader } from "../../components/ui";
import { tw } from "../../assets";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyEmail");
    if (!storedEmail) {
      navigate("/register"); // safety redirect
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!code) {
      showToast("Please enter verification code", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await PostUser("verify-email", { email, code });

      if (res.token) {
        localStorage.setItem("token", res.token);
        showToast("Email verified successfully 🎉", "success");
        navigate("/");
      } else {
        showToast(res.message || "Invalid or expired code", "error");
      }
    } catch (error) {
      showToast("Verification failed ❌", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
            <img src={tw} alt="logo" className="h-14 w-14" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Verify your email
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the code sent to your email
        </p>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3
                       text-center tracking-widest text-lg
                       placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition
                       py-2.5 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? <Loader /> : "Verify Email"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Didn’t receive the code?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => showToast("Resend coming soon 🚀", "info")}
          >
            Resend
          </button>
        </p>
      </div>
    </main>
  );
};

export default VerifyEmail;
