import { createContext, useContext, useState, useEffect } from "react";
import { GetUser, PostUser } from "../auth/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // setLoading(false);
      return;
    }
    GetUser("user")
      .then((data) => setUser(data))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);
  const login = async (data) => {
    const res = await PostUser("login", data);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setUser(res.user);
    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, isLogin: !!user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
