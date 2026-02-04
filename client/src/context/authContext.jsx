import { createContext, useContext, useEffect, useState } from "react";
import { GetUser, PostUser } from "../auth/auth";
import { Navigate } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userpost, setUserPost] = useState(null);
  const [useraudio, setUserAudios] = useState(null);
  const [totalaudio, setTotalAudios] = useState(null);
  const [totalposts, setTotalposts] = useState(0);
  // 🔄 Restore user from token
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);

        return <Navigate to="/login" replace />;
      }

      const data = await GetUser("user"); // token sent in headers
      setUser(data.user);

      setUserPost(data.posts);
      setTotalposts(data.totalPosts);
      setUserAudios(data.audios);
      setTotalAudios(data.totalAudios);
    } catch (err) {
      console.error("Auth restore failed:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // 🔐 Login
  const login = async (credentials) => {
    const res = await PostUser("login", credentials);

    if (res?.token) {
      localStorage.setItem("token", res.token);
      await loadUser(); // 🔥 IMPORTANT
    }

    return res;
  };
  const token = localStorage.getItem("token");
  // 🔐 Used by verify-email & OAuth
  const setAuthToken = async (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    await loadUser();
  };

  const feedClear = () => {
    sessionStorage.removeItem("postsFeed");
    sessionStorage.removeItem("postsFeedPage");
    sessionStorage.removeItem("postsFeedTotalPages");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("subscription");
    sessionStorage.removeItem("postsFeed");
    sessionStorage.removeItem("postsFeedPage");
    sessionStorage.removeItem("postsFeedTotalPages");
    setUser(null);
    return <Navigate to="/login" replace />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userpost,
        totalposts,
        setUser,
        isLogin: !!user,
        loading,
        login,
        logout,
        setAuthToken,
        token,
        loadUser,
        useraudio,
        totalaudio,
        feedClear,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
