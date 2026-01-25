import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { Loader } from "../../components/ui";
import { tw } from "../../assets";
import { useAuth } from "../../context/authContext";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyType, setVerifyType] = useState("");
  const [verifyValue, setVerifyValue] = useState("");

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setAuthToken } = useAuth();

  useEffect(() => {
    const type = localStorage.getItem("verifyType");
    const value = localStorage.getItem("verifyValue");

    if (!type || !value) {
      navigate("/login");
      return;
    }

    setVerifyType(type);
    setVerifyValue(value);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!code) {
      showToast("Enter verification code", "error");
      return;
    }

    setLoading(true);

    try {
      const payload =
        verifyType === "EMAIL"
          ? { email: verifyValue, code }
          : { identifier: verifyValue, code };

      const res = await PostUser("verify-code", payload);

      if (res.token) {
        await setAuthToken(res.token);

        localStorage.removeItem("verifyType");
        localStorage.removeItem("verifyValue");
        localStorage.setItem("userId", res?.userId);
        showToast("Verified successfully 🎉", "success");
        const isForgetFlow = localStorage.getItem("ForgetPass") === "RESET";
        if (isForgetFlow) {
          localStorage.removeItem("ForgetPass")
          return navigate("/reset-pass", { replace: true });
        }
        navigate("/", { replace: true });
      } else {
        showToast(res.message || "Invalid code", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Verification failed ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
            <img src={tw} alt="logo" className="h-14 w-14" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-2">
          Verify your account
        </h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-center"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-2.5 rounded-lg"
          >
            {loading ? <Loader /> : "Verify"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default VerifyEmail;
