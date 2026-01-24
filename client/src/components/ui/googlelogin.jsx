import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Loader } from ".";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
const GoogleButton = () => {
  const { setAuthToken } = useAuth();
  const [loading, setloading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const handleSuccess = async (response) => {
    setloading(true);
    try {
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
        showToast("Login successful 🎉", "success");
      }
    } catch (error) {
      console.log(error);
      showToast("Error login user", "error");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-8 flex justify-center items-center bg-white rounded-sm">
          <Loader />
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Google error")}
        />
      )}
    </>
  );
};

export default GoogleButton;
