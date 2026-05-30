import { create } from "zustand";

interface Notification {
  id: number;
  message: string;
}

interface NotificationState {
  list: Notification[];
  add: (msg: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  list: [],
  add: (msg) =>
    set((state) => ({
      list: [...state.list, { id: Date.now(), message: msg }],
    })),
  clear: () => set({ list: [] }),
}));