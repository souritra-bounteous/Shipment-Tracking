import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { ErrorState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCreateShipment } from "../../hooks/useShipments";

export default function BookShipment() {
  const { user } = useCurrentUser();
  const createShipment = useCreateShipment();
  const [form, setForm] = useState({
    customerId: "",
    receiverId: "",
    origin: "",
    destination: "",
    weight: "",
    dimensions: "",
    shippingCost: "350",
    expectedDeliveryDate: "",
  });

  const customerId = user?.id ?? form.customerId;

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  return (
    <Page>
      <PageHeader
        title="Book Shipment"
        description="Create a shipment booking that starts in BOOKED status and is ready for payment."
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              createShipment.mutate({
                customerId,
                receiverId: form.receiverId || undefined,
                origin: form.origin,
                destination: form.destination,
                weight: Number(form.weight || 0),
                dimensions: form.dimensions,
                shippingCost: Number(form.shippingCost || 0),
                expectedDeliveryDate: form.expectedDeliveryDate || undefined,
              });
            }}
          >
            {!user && (
              <Input
                label="Customer ID"
                value={form.customerId}
                onChange={(event) => update("customerId", event.target.value)}
                placeholder="UUID from AuthService"
                required
              />
            )}
            <Input
              label="Receiver ID"
              value={form.receiverId}
              onChange={(event) => update("receiverId", event.target.value)}
              placeholder="Optional receiver UUID"
            />
            <Input
              label="Pickup Address"
              value={form.origin}
              onChange={(event) => update("origin", event.target.value)}
              placeholder="Bangalore warehouse"
              required
            />
            <Input
              label="Delivery Address"
              value={form.destination}
              onChange={(event) => update("destination", event.target.value)}
              placeholder="Mumbai office"
              required
            />
            <Input
              label="Weight (kg)"
              type="number"
              value={form.weight}
              onChange={(event) => update("weight", event.target.value)}
              placeholder="12"
            />
            <Input
              label="Dimensions"
              value={form.dimensions}
              onChange={(event) => update("dimensions", event.target.value)}
              placeholder="40 x 30 x 20 cm"
            />
            <Input
              label="Estimated Price"
              type="number"
              value={form.shippingCost}
              onChange={(event) => update("shippingCost", event.target.value)}
            />
            <Input
              label="Expected Delivery"
              type="date"
              value={form.expectedDeliveryDate}
              onChange={(event) => update("expectedDeliveryDate", event.target.value)}
            />
            <div className="md:col-span-2">
              <Button fullWidth disabled={createShipment.isPending || !customerId}>
                {createShipment.isPending ? "Creating..." : "Proceed to Payment"}
              </Button>
            </div>
          </form>
          {createShipment.isError && <div className="mt-4"><ErrorState message={createShipment.error.message} /></div>}
        </Card>

        <Card className="space-y-4">
          <h2 className="text-lg font-black text-slate-900">Booking Preview</h2>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase text-slate-400">Route</p>
            <p className="mt-1 font-semibold text-slate-900">
              {form.origin || "Pickup"} → {form.destination || "Delivery"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-700">
              <p className="text-xs font-bold uppercase">Status</p>
              <div className="mt-2"><StatusBadge status="BOOKED" /></div>
            </div>
            <div className="rounded-2xl bg-green-50 p-4 text-green-700">
              <p className="text-xs font-bold uppercase">Price</p>
              <p className="mt-2 text-2xl font-black">₹{form.shippingCost || 0}</p>
            </div>
          </div>
          {createShipment.isSuccess && (
            <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
              Shipment created: <strong>{createShipment.data.trackingId}</strong>
            </div>
          )}
        </Card>
      </div>
    </Page>
  );
}
