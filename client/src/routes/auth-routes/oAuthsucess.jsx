import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      loginWithToken(token).then(() => navigate("/"));
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging in...</p>;
};

export default OAuthSuccess;
