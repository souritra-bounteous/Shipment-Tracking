type Props = {
  role: "CUSTOMER" | "DRIVER" | "ADMIN";
};

const roleStyles = {
  CUSTOMER: "bg-blue-600",
  DRIVER: "bg-green-600",
  ADMIN: "bg-purple-600",
};

export default function Sidebar({ role = "CUSTOMER" }: Props) {
  const menus = {
    CUSTOMER: ["Book Shipment", "Track Shipment", "Payment", "History", "Complaints"],
    DRIVER: ["Assigned Shipment", "Update Status", "POD Upload", "Earnings"],
    ADMIN: ["Manage Drivers", "Manage Shipments", "Assign Drivers", "Reports"],
  };

  return (
    <div className={`w-64 h-screen text-white p-5 ${roleStyles[role]}`}>
      <div className="mb-6">
        <div className="w-12 h-12 bg-white rounded-full mb-3" />
        <h2 className="font-bold">{role}</h2>
      </div>

      <nav className="flex flex-col gap-3 text-sm">
        {menus[role].map((item) => (
          <div key={item} className="hover:opacity-80 cursor-pointer">
            • {item}
          </div>
        ))}
      </nav>
    </div>
  );
}
