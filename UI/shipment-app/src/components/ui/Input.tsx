import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: ReactNode;
};

export default function Input({ label, helperText, className = "", ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>}
      <input
        className={[
          "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
          className,
        ].join(" ")}
        {...props}
      />
      {helperText && <span className="mt-1 block text-xs text-slate-500">{helperText}</span>}
    </label>
  );
}
