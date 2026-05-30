import { create } from "zustand";
import type { Role } from "../types";

interface AuthState {
  token: string | null;
  role: Role | null;
  email: string | null;
  login: (token: string, role: Role | null, email?: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: (localStorage.getItem("role") as Role | null) || null,
  email: localStorage.getItem("email"),

  login: (token, role, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role || "");
    if (email) localStorage.setItem("email", email);
    set({ token, role, email: email ?? null });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, role: null, email: null });
  },
}));