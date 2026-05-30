import type { ComplaintStatus, PaymentStatus, ShipmentStatus } from "../../types";

type Status = ShipmentStatus | PaymentStatus | ComplaintStatus | string;

const colors: Record<string, string> = {
  BOOKED: "bg-blue-50 text-blue-700 ring-blue-200",
  PACKED: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  ASSIGNED: "bg-purple-50 text-purple-700 ring-purple-200",
  PICKED_UP: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  IN_TRANSIT: "bg-green-50 text-green-700 ring-green-200",
  OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 ring-orange-200",
  DELIVERED: "bg-lime-50 text-lime-700 ring-lime-200",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200",
  PAID: "bg-green-50 text-green-700 ring-green-200",
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  FAILED: "bg-red-50 text-red-700 ring-red-200",
  OPEN: "bg-orange-50 text-orange-700 ring-orange-200",
  IN_REVIEW: "bg-blue-50 text-blue-700 ring-blue-200",
  RESOLVED: "bg-green-50 text-green-700 ring-green-200",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ring-1",
        colors[status] ?? "bg-slate-50 text-slate-700 ring-slate-200",
      ].join(" ")}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
