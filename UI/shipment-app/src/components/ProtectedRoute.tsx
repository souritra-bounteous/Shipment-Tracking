import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { Role } from "../types";

type Props = {
  children?: ReactNode;
  roles?: Role[];
};

export const ProtectedRoute = ({ children, roles }: Props) => {
  const token = useAuthStore((s) => s.token);
  const role = useAuthStore((s) => s.role);

  if (!token) return <Navigate to="/login" replace />;
  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to={`/${role?.toLowerCase() ?? "login"}`} replace />;
  }

  return children ? children : <Outlet />;
};