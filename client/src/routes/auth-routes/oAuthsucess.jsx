import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Loader } from "../../components/ui";

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

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default OAuthSuccess;
