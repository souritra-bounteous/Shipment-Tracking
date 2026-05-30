import { api } from "./axios";
import { AuthResponse } from "../types";

export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};