import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isLoggedIn, role } = useAuth();

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
