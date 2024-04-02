import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = Cookies.get("jwt_token");

  return token !== undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  )
};

export default ProtectedRoute;
