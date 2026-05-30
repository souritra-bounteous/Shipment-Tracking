
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}