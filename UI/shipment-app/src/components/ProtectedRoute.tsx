import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ProtectedRoute = ({ children }: any) => {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" />;
};