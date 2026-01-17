import { GoogleLogin } from "@react-oauth/google";
import { PostUser } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const GoogleButton = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const responseMessage = async (response) => {
    try {
      const res = await PostUser("google-login", {
        token: response.credential, // 👈 Google ID token
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        showToast("Logged in with Google 🎉", "success");
        navigate("/");
      } else {
        showToast("Google login failed", "error");
      }
    } catch (err) {
      showToast("Google auth error", "error");
      console.log(err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={responseMessage}
      onError={() => showToast("Google Login Failed", "error")}
    />
  );
};

export default GoogleButton;
