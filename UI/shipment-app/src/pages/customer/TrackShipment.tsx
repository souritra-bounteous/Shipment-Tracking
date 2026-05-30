import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

export default function TrackShipment() {
  const { data } = useQuery({
    queryKey: ["tracking"],
    queryFn: () => api.get("/tracking/123"),
  });

  return (
    <div>
      {data?.data?.events?.map((e: any) => (
        <p key={e.id}>{e.status}</p>
      ))}
    </div>
  );
}