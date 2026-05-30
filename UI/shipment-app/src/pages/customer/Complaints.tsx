import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import Input from "../../components/ui/Input";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useCreateComplaint, useGetComplaints } from "../../hooks/useComplaints";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import type { Complaint } from "../../types";

export default function CustomerComplaints() {
  const { user } = useCurrentUser();
  const complaints = useGetComplaints();
  const createComplaint = useCreateComplaint();
  const [form, setForm] = useState({
    shipmentId: "",
    customerId: "",
    subject: "",
    description: "",
  });

  const customerId = user?.id ?? form.customerId;
  const visibleComplaints = (complaints.data ?? []).filter((complaint) =>
    customerId ? complaint.customerId === customerId : true,
  );

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  return (
    <Page>
      <PageHeader title="Complaints" description="Raise and monitor shipment complaints." />

      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              createComplaint.mutate({
                shipmentId: form.shipmentId,
                customerId,
                subject: form.subject,
                description: form.description,
              });
            }}
          >
            <Input label="Shipment ID" value={form.shipmentId} onChange={(event) => update("shipmentId", event.target.value)} required />
            {!user && (
              <Input label="Customer ID" value={form.customerId} onChange={(event) => update("customerId", event.target.value)} required />
            )}
            <Input label="Subject" value={form.subject} onChange={(event) => update("subject", event.target.value)} required />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Description</span>
              <textarea
                className="min-h-28 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                required
              />
            </label>
            <Button fullWidth disabled={createComplaint.isPending || !customerId}>
              {createComplaint.isPending ? "Submitting..." : "Submit Complaint"}
            </Button>
          </form>
          {createComplaint.isError && <div className="mt-4"><ErrorState message={createComplaint.error.message} /></div>}
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-black text-slate-900">Complaint List</h2>
          {complaints.isLoading ? (
            <LoadingState />
          ) : complaints.isError ? (
            <ErrorState message={complaints.error.message} />
          ) : (
            <DataTable<Complaint>
              data={visibleComplaints}
              keyExtractor={(row) => row.id}
              columns={[
                { header: "Subject", accessor: "subject" },
                { header: "Shipment", accessor: "shipmentId" },
                { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
                { header: "Resolution", accessor: (row) => row.resolution ?? "Pending" },
              ]}
            />
          )}
        </Card>
      </div>
    </Page>
  );
}
