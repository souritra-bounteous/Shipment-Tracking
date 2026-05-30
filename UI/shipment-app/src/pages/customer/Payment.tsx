import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { ErrorState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCreatePayment, useGetPayment } from "../../hooks/usePayments";

export default function Payment() {
  const { user } = useCurrentUser();
  const [shipmentId, setShipmentId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("350");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [transactionReference, setTransactionReference] = useState("");
  const payments = useGetPayment(shipmentId);
  const createPayment = useCreatePayment();

  const resolvedCustomerId = user?.id ?? customerId;

  return (
    <Page>
      <PageHeader title="Payment" description="Verify or create shipment payments through ShipmentService." />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              createPayment.mutate({
                shipmentId,
                customerId: resolvedCustomerId,
                amount: Number(amount),
                paymentMethod,
                transactionReference,
              });
            }}
          >
            <Input label="Shipment ID" value={shipmentId} onChange={(event) => setShipmentId(event.target.value)} required />
            {!user && (
              <Input label="Customer ID" value={customerId} onChange={(event) => setCustomerId(event.target.value)} required />
            )}
            <Input label="Amount" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Payment Method</span>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option>UPI</option>
                <option>Card</option>
                <option>Cash</option>
                <option>NetBanking</option>
              </select>
            </div>
            <Input
              label="Transaction Reference"
              value={transactionReference}
              onChange={(event) => setTransactionReference(event.target.value)}
              placeholder="txn_123"
            />
            <Button fullWidth disabled={createPayment.isPending || !shipmentId || !resolvedCustomerId}>
              {createPayment.isPending ? "Processing..." : "Pay Now"}
            </Button>
          </form>
          {createPayment.isError && <div className="mt-4"><ErrorState message={createPayment.error.message} /></div>}
        </Card>

        <Card>
          <h2 className="text-lg font-black text-slate-900">Payment History</h2>
          <p className="mb-4 text-sm text-slate-500">Enter a shipment ID to fetch payment records.</p>
          {payments.data?.length ? (
            <div className="space-y-3">
              {payments.data.map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-black text-slate-900">₹{payment.amount}</p>
                      <p className="text-sm text-slate-500">{payment.paymentMethod}</p>
                    </div>
                    <StatusBadge status={payment.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
              No payment records loaded.
            </div>
          )}
        </Card>
      </div>
    </Page>
  );
}
