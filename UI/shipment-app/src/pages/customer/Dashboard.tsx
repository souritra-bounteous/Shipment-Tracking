import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCustomerShipments } from "../../hooks/useShipments";
import type { Shipment } from "../../types";

export default function CustomerDashboard() {
  const { user, isLoading: userLoading } = useCurrentUser();
  const shipments = useCustomerShipments(user?.id);
  const data = shipments.data ?? [];

  const inTransit = data.filter((shipment) =>
    ["ASSIGNED", "PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(shipment.status),
  ).length;
  const delivered = data.filter((shipment) => shipment.status === "DELIVERED").length;
  const cancelled = data.filter((shipment) => shipment.status === "CANCELLED").length;

  if (userLoading) return <LoadingState label="Resolving customer profile..." />;

  return (
    <Page>
      <PageHeader
        title="Customer Dashboard"
        description="Book shipments, monitor delivery progress, and manage recent activity."
      />

      {!user && (
        <ErrorState message="Your user profile could not be resolved from the logged-in email. Please use the booking and payment forms with explicit IDs." />
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Shipments" value={data.length} tone="blue" icon="📦" />
        <StatCard title="In Transit" value={inTransit} tone="yellow" icon="🚚" />
        <StatCard title="Delivered" value={delivered} tone="green" icon="✓" />
        <StatCard title="Cancelled" value={cancelled} tone="red" icon="×" />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Recent Shipments</h2>
            <p className="text-sm text-slate-500">Latest customer shipments from ShipmentService.</p>
          </div>
        </div>
        {shipments.isError ? (
          <ErrorState message={shipments.error.message} />
        ) : shipments.isLoading ? (
          <LoadingState />
        ) : (
          <DataTable<Shipment>
            data={data}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Tracking ID", accessor: (row) => <span className="font-bold">{row.trackingId}</span> },
              { header: "Route", accessor: (row) => `${row.origin ?? "Origin"} → ${row.destination ?? "Destination"}` },
              { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
              {
                header: "Date",
                accessor: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—"),
              },
            ]}
          />
        )}
      </Card>
    </Page>
  );
}
