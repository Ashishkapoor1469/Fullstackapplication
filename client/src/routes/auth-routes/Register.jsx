import React, { useState } from "react";
import { tw } from "../../assets";
import { PostUser } from "../../auth/auth";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Google } from "../../components/ui";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("");

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleClick = async (e) => {
    e.preventDefault();

    if (password !== conpass) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      const res = await PostUser("register", {
        username,
        fullname,
        password,
      });

      if (res.success) {
        showToast("Registration successful 🎉", "success");
        localStorage.setItem("verifyEmail", res.email); // store email
        navigate("/verify-email");
      } else {
        showToast(res.message || "Registration failed", "error");
      }
    } catch (err) {
      showToast("Server error ❌", "error");
      console.log(err);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-neutral-100 flex items-center justify-center">
            <img src={tw} alt="logo" className="h-14 w-14" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Create your account
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Join us and start your journey 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleClick} className="space-y-4">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Full name"
            onChange={(e) => setFullname(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConpass(e.target.value)}
          />

          <button className="w-full bg-white text-black py-2.5 rounded-lg font-medium hover:bg-gray-200 transition">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* OAuth */}
        <Google />

        {/* Footer */}
        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;

/* ---------- Reusable Input Component ---------- */
const Input = ({ type = "text", ...props }) => (
  <input
    type={type}
    {...props}
    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2.5
               placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);
