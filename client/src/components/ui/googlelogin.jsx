import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
const GoogleButton = () => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();
  const handleSuccess = async (response) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/google-login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: response.credential,
        }),
      },
    );

    const data = await res.json();
    if (data.token) {
      await setAuthToken(data.token);
      navigate("/");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Google error")}
    />
  );
};

export default GoogleButton;
