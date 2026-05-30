import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={[
        "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/70",
        className,
      ].join(" ")}
    >
      {children}
    </motion.section>
  );
}
