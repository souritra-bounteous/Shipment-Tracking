import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { ErrorState, Page, PageHeader } from "../../components/ui/Page";
import { useUploadProof } from "../../hooks/useTracking";

export default function ProofUpload() {
  const uploadProof = useUploadProof();
  const [shipmentId, setShipmentId] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);

  return (
    <Page>
      <PageHeader title="Proof of Delivery" description="Upload receiver photo and signature after delivery." />

      <Card className="max-w-3xl">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (photo && signature) uploadProof.mutate({ shipmentId, photo, signature });
          }}
        >
          <Input label="Shipment ID" value={shipmentId} onChange={(event) => setShipmentId(event.target.value)} required />
          <label className="block rounded-2xl border border-dashed border-slate-300 p-5">
            <span className="block text-sm font-bold text-slate-700">Receiver Photo</span>
            <input className="mt-3 text-sm" type="file" accept="image/*" onChange={(event) => setPhoto(event.target.files?.[0] ?? null)} />
          </label>
          <label className="block rounded-2xl border border-dashed border-slate-300 p-5">
            <span className="block text-sm font-bold text-slate-700">Receiver Signature</span>
            <input className="mt-3 text-sm" type="file" accept="image/*" onChange={(event) => setSignature(event.target.files?.[0] ?? null)} />
          </label>
          <Button fullWidth variant="success" disabled={uploadProof.isPending || !shipmentId || !photo || !signature}>
            {uploadProof.isPending ? "Uploading..." : "Confirm Delivery"}
          </Button>
        </form>
        {uploadProof.isError && <div className="mt-4"><ErrorState message={uploadProof.error.message} /></div>}
        {uploadProof.isSuccess && (
          <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm font-semibold text-green-700">
            Proof uploaded for shipment {uploadProof.data.shipmentId}
          </div>
        )}
      </Card>
    </Page>
  );
}
