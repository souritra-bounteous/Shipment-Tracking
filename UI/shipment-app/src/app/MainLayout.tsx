import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Topbar from "../components/layout/Topbar";
import { useAuthStore } from "../store/authStore";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true,
  );
  const role = useAuthStore((s) => s.role) ?? "CUSTOMER";

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const syncSidebar = () => setSidebarOpen(media.matches);
    syncSidebar();
    media.addEventListener("change", syncSidebar);
    return () => media.removeEventListener("change", syncSidebar);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-w-0 flex-1">
        <Topbar role={role} onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}