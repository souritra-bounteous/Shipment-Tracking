import { useMemo, useState } from "react";
import LiveMap from "../../components/LiveMap";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import Timeline from "../../components/ui/Timeline";
import { useShipmentByTrackingId } from "../../hooks/useShipments";
import { useShipmentLocation, useTrackingHistory } from "../../hooks/useTracking";

export default function TrackShipment() {
  const [trackingId, setTrackingId] = useState("");
  const [submittedTrackingId, setSubmittedTrackingId] = useState("");
  const shipment = useShipmentByTrackingId(submittedTrackingId);
  const shipmentId = shipment.data?.id;
  const history = useTrackingHistory(shipmentId);
  const location = useShipmentLocation(shipmentId);

  const latestEvent = useMemo(
    () => history.data?.events?.[history.data.events.length - 1],
    [history.data],
  );

  return (
    <Page>
      <PageHeader
        title="Shipment Tracking"
        description="Search by tracking ID to view the timeline and latest live location."
      />

      <Card>
        <form
          className="grid gap-3 md:grid-cols-[1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmittedTrackingId(trackingId.trim());
          }}
        >
          <Input
            label="Tracking ID"
            value={trackingId}
            onChange={(event) => setTrackingId(event.target.value)}
            placeholder="STRK1234567"
          />
          <div className="flex items-end">
            <Button type="submit" disabled={!trackingId.trim()}>
              Track Shipment
            </Button>
          </div>
        </form>
      </Card>

      {shipment.isError && <ErrorState message={shipment.error.message} />}

      {shipment.isLoading && submittedTrackingId ? (
        <LoadingState label="Finding shipment..." />
      ) : shipment.data ? (
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Tracking ID</p>
                <h2 className="text-xl font-black text-slate-900">{shipment.data.trackingId}</h2>
              </div>
              <StatusBadge status={shipment.data.status} />
            </div>
            {history.isLoading ? (
              <LoadingState />
            ) : history.isError ? (
              <ErrorState message={history.error.message} />
            ) : (
              <Timeline events={history.data?.events} />
            )}
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">Live Location</h2>
                <p className="text-sm text-slate-500">
                  {location.data?.location ?? latestEvent?.location ?? "Waiting for GPS update"}
                </p>
              </div>
              {latestEvent && <StatusBadge status={latestEvent.status} />}
            </div>
            <LiveMap
              lat={location.data?.latitude ?? latestEvent?.latitude}
              lng={location.data?.longitude ?? latestEvent?.longitude}
              label={location.data?.location ?? "Shipment location"}
            />
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">From</p>
                <p className="mt-1 font-semibold text-slate-800">{shipment.data.origin ?? "—"}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">To</p>
                <p className="mt-1 font-semibold text-slate-800">{shipment.data.destination ?? "—"}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-400">ETA</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {shipment.data.expectedDeliveryDate ?? "Pending"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </Page>
  );
}