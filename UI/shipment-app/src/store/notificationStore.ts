import { create } from "zustand";

interface Notification {
  id: number;
  message: string;
  tone?: "info" | "success" | "warning";
}

interface NotificationState {
  list: Notification[];
  add: (msg: string, tone?: Notification["tone"]) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  list: [{ id: 1, message: "Shipment tracking platform is online", tone: "success" }],
  add: (msg, tone = "info") =>
    set((state) => ({
      list: [...state.list, { id: Date.now(), message: msg, tone }],
    })),
  clear: () => set({ list: [] }),
}));