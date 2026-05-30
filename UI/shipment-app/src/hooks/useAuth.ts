import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";
import { loginApi, registerApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import type { DriverProfile, Role, User } from "../types";

const decodeJwtPayload = (token: string): { role?: Role; sub?: string } => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
};

export const useLogin = () => {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const decoded = decodeJwtPayload(data.accessToken);
      login(data.accessToken, data.role ?? decoded.role ?? "CUSTOMER", decoded.sub ?? null);
    },
  });
};

export const useRegister = () =>
  useMutation({
    mutationFn: registerApi,
  });

export const useUsers = () =>
  useQuery({
    queryKey: ["auth", "users"],
    queryFn: async () => {
      const res = await api.get<User[]>("/auth/users");
      return res.data;
    },
  });

export const useDrivers = () =>
  useQuery({
    queryKey: ["auth", "drivers"],
    queryFn: async () => {
      const res = await api.get<DriverProfile[]>("/auth/drivers");
      return res.data;
    },
  });