import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDriverShipments } from "../../hooks/useShipments";
import type { Shipment } from "../../types";

export default function ShipmentDetails() {
  const { driver } = useCurrentUser();
  const shipments = useDriverShipments(driver?.id);

  return (
    <Page>
      <PageHeader title="Shipment Details" description="Assigned shipment details and navigation-ready route data." />

      <Card>
        {shipments.isLoading ? (
          <LoadingState />
        ) : shipments.isError ? (
          <ErrorState message={shipments.error.message} />
        ) : (
          <DataTable<Shipment>
            data={shipments.data ?? []}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Tracking ID", accessor: (row) => <span className="font-bold">{row.trackingId}</span> },
              { header: "Customer", accessor: "customerId" },
              { header: "Pickup", accessor: (row) => row.origin ?? "—" },
              { header: "Delivery", accessor: (row) => row.destination ?? "—" },
              { header: "Weight", accessor: (row) => `${row.weight ?? 0} kg` },
              { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
            ]}
          />
        )}
      </Card>
    </Page>
  );
}
