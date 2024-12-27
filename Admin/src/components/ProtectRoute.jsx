import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectRoute;

