import Card from "./Card";

type Tone = "blue" | "green" | "yellow" | "red" | "purple" | "slate";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  tone?: Tone;
  icon?: string;
};

const tones: Record<Tone, string> = {
  blue: "from-blue-50 to-blue-100 text-blue-700",
  green: "from-green-50 to-green-100 text-green-700",
  yellow: "from-amber-50 to-amber-100 text-amber-700",
  red: "from-red-50 to-red-100 text-red-700",
  purple: "from-purple-50 to-purple-100 text-purple-700",
  slate: "from-slate-50 to-slate-100 text-slate-700",
};

export default function StatCard({ title, value, subtitle, tone = "slate", icon }: Props) {
  return (
    <Card className={`bg-gradient-to-br ${tones[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{title}</p>
          <p className="mt-2 text-3xl font-black">{value}</p>
          {subtitle && <p className="mt-1 text-xs opacity-70">{subtitle}</p>}
        </div>
        {icon && (
          <div className="rounded-2xl bg-white/70 px-3 py-2 text-2xl shadow-sm">{icon}</div>
        )}
      </div>
    </Card>
  );
}
