import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Google, Loader } from "../../components/ui";
import { tw } from "../../assets";
import { useToast } from "../../context/ToastContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      showToast("All fields are required", "error");
      return;
    }

    setSubmitting(true);

    try {
      const res = await login({ identifier, password });

      // 🔐 Verification required
      if (res.step === "VERIFY_EMAIL" || res.step === "VERIFY_CHROME") {
        localStorage.setItem("verifyType", "IDENTIFIER");
        localStorage.setItem("verifyValue", identifier);

        showToast("Please verify your email", "info");
        navigate("/verify-email", { replace: true });
        return;
      }

      // ✅ Success
      if (res.token) {
        showToast("Login successful 🎉", "success");
        localStorage.setItem("userId", res?.userId);
        navigate("/", { replace: true });
      } else {
        showToast(res.message || "Login failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error ❌", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-zinc-900 rounded-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex items-center justify-center">
          <img src={tw} alt="logo" className="w-full h-full" />
        </div>

        <div className="p-8 text-white">
          <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
          <p className="text-sm text-gray-400 mb-6">Login to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />

            <Input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </Input>

            <button
              disabled={submitting}
              className="w-full bg-blue-500 flex justify-center items-center hover:bg-blue-600 transition py-2.5 rounded-lg"
            >
              {submitting ? <Loader /> : "Login"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="px-3 text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          <Google />

          <p className="text-sm text-gray-400 text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
          <p className="text-sm text-gray-400 text-center mt-6">
            <Link to="/forget" className="text-blue-500 hover:underline">
              Forgot Password{" "}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;

const Input = ({ type = "text", children, ...props }) => (
  <div className="relative">
    <input
      type={type}
      {...props}
      className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2.5 pr-10
                 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {children}
  </div>
);
