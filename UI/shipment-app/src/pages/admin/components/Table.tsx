type Props = {
  data: any[];
};

export default function Table({ data }: Props) {
  return (
    <table className="w-full border rounded-lg overflow-hidden bg-white">
      <thead className="bg-gray-100 text-sm">
        <tr>
          <th className="p-2">Tracking ID</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="text-sm border-t">
            <td className="p-2">{row.id}</td>
            <td>{row.status}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
