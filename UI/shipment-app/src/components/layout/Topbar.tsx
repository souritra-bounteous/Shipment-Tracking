import { useState } from "react";
import { useNotificationStore } from "../../store/notificationStore";
import { useAuthStore } from "../../store/authStore";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const notifications = useNotificationStore((s) => s.list);
  const clear = useNotificationStore((s) => s.clear);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">

      {/* Left */}
      <h2 className="font-bold">Dashboard</h2>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* 🔔 Notification */}
        <div className="relative">
          <button onClick={() => setOpen(!open)}>🔔</button>

          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
              {notifications.length}
            </span>
          )}

          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow rounded">
              <div className="p-2 border-b font-bold">
                Notifications
              </div>

              {notifications.map((n) => (
                <div key={n.id} className="p-2 border-b">
                  {n.message}
                </div>
              ))}

              <button onClick={clear} className="w-full p-2 text-red-500">
                Clear
              </button>
            </div>
          )}
        </div>

        {/* 👤 Profile */}
        <div className="relative">
          <button className="bg-gray-200 px-3 py-1 rounded">
            Profile
          </button>

          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 shadow rounded">
            <button
              onClick={logout}
              className="block px-4 py-2 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}