import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { menuConfig, type Role } from "../config/menuConfig";

type Props = {
  role: Role;
  open: boolean;
  onClose: () => void;
};

const roleStyles: Record<Role, string> = {
  CUSTOMER: "from-blue-700 to-blue-500",
  DRIVER: "from-green-700 to-green-500",
  ADMIN: "from-purple-700 to-purple-500",
};

export default function Sidebar({ role, open, onClose }: Props) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b ${roleStyles[role]} p-5 text-white shadow-2xl lg:static lg:translate-x-0`}
      >
        <div className="mb-8 rounded-3xl bg-white/10 p-4 ring-1 ring-white/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl">
            {role === "CUSTOMER" ? "●" : role === "DRIVER" ? "◆" : "■"}
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70">{role}</p>
          <h2 className="mt-1 text-xl font-black">Shipment Portal</h2>
        </div>

        <nav className="space-y-2">
          {menuConfig[role].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/${role.toLowerCase()}`}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  isActive ? "bg-white text-slate-900 shadow-lg" : "text-white/90 hover:bg-white/15",
                ].join(" ")
              }
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-sm">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
