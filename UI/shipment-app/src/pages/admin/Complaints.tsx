import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import { ErrorState, LoadingState, Page, PageHeader } from "../../components/ui/Page";
import StatusBadge from "../../components/ui/StatusBadge";
import { useGetComplaints, useUpdateComplaint } from "../../hooks/useComplaints";
import type { Complaint } from "../../types";

export default function AdminComplaints() {
  const complaints = useGetComplaints();
  const updateComplaint = useUpdateComplaint();

  return (
    <Page>
      <PageHeader title="Complaints" description="Review customer complaints and resolve operational issues." />

      <Card>
        {complaints.isLoading ? (
          <LoadingState />
        ) : complaints.isError ? (
          <ErrorState message={complaints.error.message} />
        ) : (
          <DataTable<Complaint>
            data={complaints.data ?? []}
            keyExtractor={(row) => row.id}
            columns={[
              { header: "Subject", accessor: (row) => <span className="font-bold">{row.subject}</span> },
              { header: "Shipment", accessor: "shipmentId" },
              { header: "Customer", accessor: "customerId" },
              { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
              {
                header: "Action",
                accessor: (row) => (
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      disabled={updateComplaint.isPending}
                      onClick={() =>
                        updateComplaint.mutate({
                          id: row.id,
                          status: "IN_REVIEW",
                          resolution: "Complaint is under admin review.",
                        })
                      }
                    >
                      Review
                    </Button>
                    <Button
                      variant="success"
                      disabled={updateComplaint.isPending}
                      onClick={() =>
                        updateComplaint.mutate({
                          id: row.id,
                          status: "RESOLVED",
                          resolution: "Resolved by support team.",
                        })
                      }
                    >
                      Resolve
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        )}
        {updateComplaint.isError && <div className="mt-4"><ErrorState message={updateComplaint.error.message} /></div>}
      </Card>
    </Page>
  );
}
