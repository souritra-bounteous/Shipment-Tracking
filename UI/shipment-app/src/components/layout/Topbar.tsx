import { useState } from "react";
import { useNotificationStore } from "../../store/notificationStore";
import { useAuthStore } from "../../store/authStore";
import type { Role } from "../../types";

type Props = {
  role: Role;
  onMenuClick: () => void;
};

const roleAccent: Record<Role, string> = {
  CUSTOMER: "bg-blue-600",
  DRIVER: "bg-green-600",
  ADMIN: "bg-purple-600",
};

export default function Topbar({ role, onMenuClick }: Props) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifications = useNotificationStore((s) => s.list);
  const clear = useNotificationStore((s) => s.clear);
  const logout = useAuthStore((s) => s.logout);
  const email = useAuthStore((s) => s.email);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/90 px-4 py-3 shadow-sm backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-slate-200 px-3 py-2 text-slate-700 lg:hidden"
        >
          ☰
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{role} workspace</p>
          <h2 className="font-black text-slate-900">Shipment Tracking Platform</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="relative rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
          >
            🔔
          </button>

          {notifications.length > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              {notifications.length}
            </span>
          )}

          {open && (
            <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
              <div className="border-b border-slate-100 p-4 font-bold text-slate-900">
                Notifications
              </div>

              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">No new notifications.</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="border-b border-slate-100 p-4 text-sm text-slate-600">
                      {n.message}
                    </div>
                  ))
                )}
              </div>

              <button onClick={clear} className="w-full p-3 text-sm font-semibold text-red-500">
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white py-1.5 pl-2 pr-3 shadow-sm"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${roleAccent[role]} text-sm font-black text-white`}>
              {role[0]}
            </span>
            <span className="hidden text-left text-sm md:block">
              <span className="block font-bold text-slate-800">{role}</span>
              <span className="block max-w-40 truncate text-xs text-slate-500">{email ?? "profile"}</span>
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
              <button
                onClick={logout}
                className="block w-full px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}