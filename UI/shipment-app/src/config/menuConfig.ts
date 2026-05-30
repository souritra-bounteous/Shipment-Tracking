export type Role = "ADMIN" | "DRIVER" | "CUSTOMER";

export const menuConfig: Record<Role, { label: string; path: string; icon: string }[]> = {
  ADMIN: [
    { label: "Dashboard", path: "/admin", icon: "▦" },
    { label: "Shipments", path: "/admin/shipments", icon: "▤" },
    { label: "Assign Drivers", path: "/admin/assign", icon: "⇄" },
    { label: "Drivers", path: "/admin/drivers", icon: "☷" },
    { label: "Complaints", path: "/admin/complaints", icon: "!" },
  ],
  DRIVER: [
    { label: "Dashboard", path: "/driver", icon: "▦" },
    { label: "Shipment Details", path: "/driver/shipments", icon: "▤" },
    { label: "Update Status", path: "/driver/update-status", icon: "✓" },
    { label: "POD Upload", path: "/driver/proof", icon: "◉" },
    { label: "Earnings", path: "/driver/earnings", icon: "$" },
  ],
  CUSTOMER: [
    { label: "Dashboard", path: "/customer", icon: "▦" },
    { label: "Book Shipment", path: "/customer/book", icon: "+" },
    { label: "Track Shipment", path: "/customer/track", icon: "⌖" },
    { label: "Payment", path: "/customer/payment", icon: "$" },
    { label: "Complaints", path: "/customer/complaints", icon: "!" },
  ],
};