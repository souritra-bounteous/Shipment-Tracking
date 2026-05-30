import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDriverEarnings, useDriverShipments } from "../../hooks/useShipments";
import type { Shipment } from "../../types";

export default function DriverDashboard() {
  const { driver, isLoading: profileLoading } = useCurrentUser();
  const shipments = useDriverShipments(driver?.id);
  const earnings = useDriverEarnings(driver?.id);
  const assigned = shipments.data ?? [];
  const todayDeliveries = assigned.filter((shipment) => shipment.status === "DELIVERED").length;
  const totalEarnings = (earnings.data ?? []).reduce((sum, earning) => sum + Number(earning.amount ?? 0), 0);

  if (profileLoading) return <LoadingState label="Resolving driver profile..." />;

  return (
    <Page>
      <PageHeader title="Driver Dashboard" description="Today’s assignments, earnings, and delivery workload." />

      {!driver && <ErrorState message="Driver profile not found for this login. Ask an admin to create your driver record." />}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Today Deliveries" value={todayDeliveries} tone="green" icon="✓" />
        <StatCard title="Assigned" value={assigned.length} tone="blue" icon="🚚" />
        <StatCard title="Earnings" value={`₹${totalEarnings.toLocaleString()}`} tone="yellow" icon="$" />
        <StatCard title="Rating" value="4.8" tone="slate" icon="★" />
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-black text-slate-900">Assigned Shipments</h2>
        {shipments.isLoading ? (
          <LoadingState />
        ) : shipments.isError ? (
          <ErrorState message={shipments.error.message} />
        ) : (
          <DataTable<Shipment>
            data={assigned}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Tracking ID", accessor: (row) => <span className="font-bold">{row.trackingId}</span> },
              { header: "Route", accessor: (row) => `${row.origin ?? "Pickup"} → ${row.destination ?? "Delivery"}` },
              { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
              { header: "Expected", accessor: (row) => row.expectedDeliveryDate ?? "—" },
            ]}
          />
        )}
      </Card>
    </Page>
  );
}
