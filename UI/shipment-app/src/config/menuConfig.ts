export type Role = "ADMIN" | "DRIVER" | "CUSTOMER";

export const menuConfig: Record<Role, { label: string; path: string }[]> = {
  ADMIN: [
    { label: "Dashboard", path: "/admin" },
    { label: "Shipments", path: "/admin/shipments" },
    { label: "Drivers", path: "/admin/drivers" },
  ],
  DRIVER: [
    { label: "Dashboard", path: "/driver" },
    { label: "Assigned", path: "/driver/assigned" },
    { label: "Earnings", path: "/driver/earnings" },
  ],
  CUSTOMER: [
    { label: "Home", path: "/customer" },
    { label: "Track", path: "/tracking" },
    { label: "Payments", path: "/customer/payments" },
  ],
};