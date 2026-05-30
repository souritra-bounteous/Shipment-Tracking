import { api } from "./axios";
import type { AuthResponse } from "../types";

export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export const registerApi = async (data: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: string;
}) => {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
};