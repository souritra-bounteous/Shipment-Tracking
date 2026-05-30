import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useDrivers } from "../../hooks/useAuth";
import { useAllShipments, useAssignDriver } from "../../hooks/useShipments";
import type { Shipment } from "../../types";

export default function AssignDriver() {
  const shipments = useAllShipments();
  const drivers = useDrivers();
  const assignDriver = useAssignDriver();
  const [selectedDriver, setSelectedDriver] = useState("");

  const availableDrivers = drivers.data ?? [];

  return (
    <Page>
      <PageHeader title="Assign Driver" description="Assign available drivers to booked or packed shipments." />

      <Card>
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Driver</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
              value={selectedDriver}
              onChange={(event) => setSelectedDriver(event.target.value)}
            >
              <option value="">Select driver</option>
              {availableDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} · {driver.vehicleNumber}
                </option>
              ))}
            </select>
          </label>
          <p className="text-sm text-slate-500">{availableDrivers.length} drivers available</p>
        </div>

        {shipments.isLoading || drivers.isLoading ? (
          <LoadingState />
        ) : shipments.isError ? (
          <ErrorState message={shipments.error.message} />
        ) : drivers.isError ? (
          <ErrorState message={drivers.error.message} />
        ) : (
          <DataTable<Shipment>
            data={(shipments.data ?? []).filter((shipment) => shipment.status !== "DELIVERED")}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Tracking ID", accessor: (row) => <span className="font-bold">{row.trackingId}</span> },
              { header: "Route", accessor: (row) => `${row.origin ?? "Origin"} → ${row.destination ?? "Destination"}` },
              { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
              { header: "Current Driver", accessor: (row) => row.assignedDriverId ?? "Unassigned" },
              {
                header: "Action",
                accessor: (row) => (
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={!selectedDriver || assignDriver.isPending}
                    onClick={() => assignDriver.mutate({ shipmentId: row.id, driverId: selectedDriver })}
                  >
                    Assign
                  </Button>
                ),
              },
            ]}
          />
        )}
        {assignDriver.isError && <div className="mt-4"><ErrorState message={assignDriver.error.message} /></div>}
      </Card>
    </Page>
  );
}
