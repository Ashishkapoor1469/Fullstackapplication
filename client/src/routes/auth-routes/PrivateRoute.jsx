import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { XLoader } from "../../components/ui";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <XLoader />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
