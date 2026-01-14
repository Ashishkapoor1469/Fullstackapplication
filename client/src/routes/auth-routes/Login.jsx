import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Google, Loader } from "../../components/ui";
import { tw } from "../../assets";
const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await login({
      identifier,
      password,
    });

    if (res?.token) {
      navigate("/");
    }

    setSubmitting(false);
  };

  return (
    <main className="min-h-screen  flex justify-center items-center w-full bg-black text-white">
      <div className="w-8/12 h-full flex lg:flex-row items-center flex-col ">
        <div className="lg:h-full h-24 w-24 lg:w-8/12 flex justify-center items-center bg-white rounded-full">
          <img className="w-full h-full " src={tw} alt="" />
        </div>
        <div className="h-full w-full flex flex-col gap-3 justify-center items-center">
          <form className="flex flex-col mt-27 gap-5" onSubmit={handleLogin}>
            <input
              className="p-2 border-b border-neutral-600 bg-transparent outline-none"
              placeholder="Email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <input
              className="border-b p-2 bg-transparent outline-none border-neutral-600"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="p-2 px-4 py-2 rounded-2xl bg-blue-500"
              disabled={submitting}
            >
              {submitting ? <Loader /> : "Login"}
            </button>
          </form>
          <span className="divide-y-2 divide-cyan-900">OR</span>
         <Google />
         <p className="text-sm">Click here if don.t have <a className="text-blue-500 underline" href="/register">Account</a></p>
        </div>
      </div>
    </main>
  );
};

export default Login;
