type Props = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatCard({ title, value, color = "bg-gray-100" }: Props) {
  return (
    <div className={`p-4 rounded-lg ${color} shadow`}>
      <h4 className="text-xs">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}