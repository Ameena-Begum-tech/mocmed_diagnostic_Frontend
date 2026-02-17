import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (role !== "SUPERADMIN") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
