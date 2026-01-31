import { useState } from "react";
import { tw } from "../../assets";
import { PostUser } from "../../auth/auth";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Google } from "../../components/ui";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setConpass] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !fullname || !email || !password) {
      showToast("All fields are required", "error");
      return;
    }

    if (password !== conpass) {
      showToast("Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await PostUser("register", {
        username,
        fullname,
        email,
        password,
      });

      if (res?.success) {
        showToast("Registration successful 🎉", "success");

        // ✅ FIX: Correct verification storage
        localStorage.setItem("verifyType", "EMAIL");
        localStorage.setItem("verifyValue", email);

        navigate("/verify-email", { replace: true });
      } else {
        showToast(res?.message || "Registration failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-neutral-100 rounded-full flex items-center justify-center">
            <img src={tw} alt="logo" className="h-14 w-14" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-2">
          Create your account
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Join us and start your journey 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="Full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            value={conpass}
            onChange={(e) => setConpass(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-white text-black py-2.5 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <Google />

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

/* ---------- Reusable Input ---------- */
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
