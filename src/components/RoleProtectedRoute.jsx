import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({
  allowedRole,
  children,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    user.role?.toLowerCase() !==
    allowedRole.toLowerCase()
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
