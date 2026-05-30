import { create } from "zustand";

interface AuthState {
  token: string | null;
  role: "ADMIN" | "DRIVER" | "CUSTOMER" | null;
  login: (token: string, role: AuthState["role"]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: (localStorage.getItem("role") as any) || null,

  login: (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role || "");
    set({ token, role });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, role: null });
  },
}));