import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useDrivers } from "../../hooks/useAuth";
import type { DriverProfile } from "../../types";

export default function Drivers() {
  const drivers = useDrivers();

  return (
    <Page>
      <PageHeader title="Driver Management" description="View driver profiles, vehicle data, and current availability." />

      <Card>
        {drivers.isLoading ? (
          <LoadingState />
        ) : drivers.isError ? (
          <ErrorState message={drivers.error.message} />
        ) : (
          <DataTable<DriverProfile>
            data={drivers.data ?? []}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Driver", accessor: (row) => <span className="font-bold">{row.name}</span> },
              { header: "License", accessor: "licenseNumber" },
              { header: "Vehicle", accessor: (row) => `${row.vehicleNumber} · ${row.vehicleType ?? "Vehicle"}` },
              { header: "Phone", accessor: (row) => row.phone ?? "—" },
              { header: "Status", accessor: (row) => <StatusBadge status={row.available ? "AVAILABLE" : "BUSY"} /> },
            ]}
          />
        )}
      </Card>
    </Page>
  );
}