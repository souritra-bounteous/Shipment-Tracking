import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useDriverShipments, useUpdateShipmentStatus } from "../../hooks/useShipments";
import type { Shipment, ShipmentStatus } from "../../types";

export default function UpdateShipment() {
  const { driver } = useCurrentUser();
  const shipments = useDriverShipments(driver?.id);
  const updateStatus = useUpdateShipmentStatus();
  const activeShipment = (shipments.data ?? []).find((shipment) => shipment.status !== "DELIVERED") ?? shipments.data?.[0];

  const statusButtons: { label: string; status: ShipmentStatus; variant: "success" | "primary" | "warning" }[] = [
    { label: "Picked Up", status: "PICKED_UP", variant: "success" },
    { label: "Start Transit", status: "IN_TRANSIT", variant: "primary" },
    { label: "Out for Delivery", status: "OUT_FOR_DELIVERY", variant: "warning" },
    { label: "Delivered", status: "DELIVERED", variant: "success" },
  ];

  const update = (shipment: Shipment, status: ShipmentStatus) =>
    updateStatus.mutate({ shipmentId: shipment.id, status });

  return (
    <Page>
      <PageHeader title="Update Status" description="Move an assigned shipment through the driver workflow." />

      {shipments.isLoading ? (
        <LoadingState />
      ) : shipments.isError ? (
        <ErrorState message={shipments.error.message} />
      ) : activeShipment ? (
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Tracking ID</p>
                <h2 className="text-2xl font-black text-slate-900">{activeShipment.trackingId}</h2>
              </div>
              <StatusBadge status={activeShipment.status} />
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Route</p>
              <p className="font-bold text-slate-900">
                {activeShipment.origin ?? "Pickup"} → {activeShipment.destination ?? "Delivery"}
              </p>
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 text-lg font-black text-slate-900">Driver Status Buttons</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {statusButtons.map((button) => (
                <Button
                  key={button.status}
                  variant={button.variant}
                  disabled={updateStatus.isPending}
                  onClick={() => update(activeShipment, button.status)}
                  className={button.status === "DELIVERED" ? "bg-green-800 hover:bg-green-900" : ""}
                >
                  {button.label}
                </Button>
              ))}
            </div>
            {updateStatus.isError && <div className="mt-4"><ErrorState message={updateStatus.error.message} /></div>}
          </Card>
        </div>
      ) : (
        <ErrorState message="No assigned shipments found." />
      )}
    </Page>
  );
}