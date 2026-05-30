import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import StatCard from "./components/StatCard";

export default function AdminDashboard() {
  const { data } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => api.get("/admin/stats"),
  });

  const stats = data?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Total Shipments" value={stats?.shipments} />
      <StatCard title="Active Drivers" value={stats?.drivers} />
      <StatCard title="Revenue" value={`₹${stats?.revenue}`} />
      <StatCard title="Delayed" value={stats?.delayed} />
    </div>
  );
}
