import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

export default function ShipmentsTable() {
  const { data } = useQuery({
    queryKey: ["shipments"],
    queryFn: () => api.get("/shipments"),
  });

  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead>
        <tr className="bg-gray-200">
          <th>ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.data.map((s: any) => (
          <tr key={s.id}>
            <td>{s.trackingId}</td>
            <td>{s.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}