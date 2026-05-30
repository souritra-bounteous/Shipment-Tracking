import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { useDashboardStats, useAllShipments } from "../../hooks/useShipments";
import type { Shipment } from "../../types";

export default function AdminDashboard() {
  const stats = useDashboardStats();
  const shipments = useAllShipments();
  const recentShipments = (shipments.data ?? []).slice(0, 5);

  return (
    <Page>
      <PageHeader title="Admin Dashboard" description="Operational summary for shipments, revenue, and status health." />

      {stats.isLoading ? (
        <LoadingState />
      ) : stats.isError ? (
        <ErrorState message={stats.error.message} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Shipments" value={stats.data.totalShipments} tone="purple" icon="📦" />
          <StatCard title="Assigned" value={stats.data.assignedShipments} tone="blue" icon="🚚" />
          <StatCard title="Delivered" value={stats.data.deliveredShipments} tone="green" icon="✓" />
          <StatCard title="Cancelled" value={stats.data.cancelledShipments} tone="red" icon="×" />
        </div>
      )}

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Recent Shipments</h2>
            <p className="text-sm text-slate-500">
              Revenue: ₹{Number(stats.data?.totalRevenue ?? 0).toLocaleString()}
            </p>
          </div>
        </div>
        {shipments.isLoading ? (
          <LoadingState />
        ) : shipments.isError ? (
          <ErrorState message={shipments.error.message} />
        ) : (
          <DataTable<Shipment>
            data={recentShipments}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Tracking ID", accessor: (row) => <span className="font-bold">{row.trackingId}</span> },
              { header: "Customer", accessor: "customerId" },
              { header: "Driver", accessor: (row) => row.assignedDriverId ?? "Unassigned" },
              { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        )}
      </Card>
    </Page>
  );
}
