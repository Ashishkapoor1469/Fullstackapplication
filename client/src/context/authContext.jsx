import { createContext, useContext, useState, useEffect } from "react";
import { GetUser, PostUser } from "../auth/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const data = await GetUser("user");
      setUser(data);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) loadUser();
    else setLoading(false);
  }, []);

  const login = async (data) => {
    const res = await PostUser("login", data);
    if (res.token) {
      localStorage.setItem("token", res.token);
      await loadUser();
    }
    return res;
  };

  const loginWithToken = async (token) => {
    localStorage.setItem("token", token);
    await loadUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin: !!user,
        loading,
        login,
        loginWithToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
