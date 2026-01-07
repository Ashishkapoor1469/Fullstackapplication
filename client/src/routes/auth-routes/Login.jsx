import React, { useState } from "react";
import { PostUser } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await PostUser("login", { user, password });
    if (res?.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <label htmlFor="user" className=" flex flex-col">
          Email or Username
          <input
            className="border-2 border-neutral-900 p-2"
            placeholder="Email or username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="flex flex-col">
          Password
          <input
          className="border-2 border-neutral-900 p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="p-2" disabled={loading}>{loading ? "loading..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
