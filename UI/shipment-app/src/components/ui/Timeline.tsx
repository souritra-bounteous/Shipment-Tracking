import type { TrackingEvent } from "../../types";
import StatusBadge from "./StatusBadge";

type Props = {
  events?: TrackingEvent[];
};

export default function Timeline({ events = [] }: Props) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        Tracking events will appear here once the shipment moves.
      </div>
    );
  }

  return (
    <ol className="relative ml-3 border-l-2 border-slate-200">
      {events.map((event, index) => (
        <li key={event.id} className="mb-7 ml-6 last:mb-0">
          <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-white ring-4 ring-green-100">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={event.status} />
            {index === events.length - 1 && (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                Latest
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-800">{event.location ?? "Location pending"}</p>
          <p className="mt-1 text-xs text-slate-500">
            {event.eventTime ? new Date(event.eventTime).toLocaleString() : "Time pending"}
          </p>
          {event.remarks && <p className="mt-2 text-sm text-slate-600">{event.remarks}</p>}
        </li>
      ))}
    </ol>
  );
}
