import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading data..." }: { label?: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
      {label}
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700">
      {message ?? "Unable to load this view. Please try again."}
    </div>
  );
}
