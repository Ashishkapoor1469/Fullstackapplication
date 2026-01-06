import React from "react";
import { useAuth } from "../../context/authContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const PrivateRoute = () => {
  const { isLogin } = useAuth();
  const location = useLocation();
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ from: location }} />
  );
};

export default PrivateRoute;
