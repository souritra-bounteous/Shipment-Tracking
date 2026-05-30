import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Login from "../pages/auth/Login";
import CustomerDashboard from "../pages/customer/Dashboard";
import BookShipment from "../pages/customer/BookShipment";
import TrackShipment from "../pages/customer/TrackShipment";
import Payment from "../pages/customer/Payment";
import CustomerComplaints from "../pages/customer/Complaints";
import DriverDashboard from "../pages/driver/Dashboard";
import ShipmentDetails from "../pages/driver/ShipmentDetails";
import UpdateShipment from "../pages/driver/UpdateShipment";
import ProofUpload from "../pages/driver/ProofUpload";
import Earnings from "../pages/driver/Earnings";
import AdminDashboard from "../pages/admin/Dashboard";
import ShipmentsTable from "../pages/admin/ShipmentsTable";
import AssignDriver from "../pages/admin/AssignDriver";
import Drivers from "../pages/admin/Drivers";
import AdminComplaints from "../pages/admin/Complaints";
import MainLayout from "./MainLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/customer" replace />} />

              <Route element={<ProtectedRoute roles={["CUSTOMER"]} />}>
                <Route path="customer" element={<CustomerDashboard />} />
                <Route path="customer/book" element={<BookShipment />} />
                <Route path="customer/track" element={<TrackShipment />} />
                <Route path="customer/payment" element={<Payment />} />
                <Route path="customer/complaints" element={<CustomerComplaints />} />
              </Route>

              <Route element={<ProtectedRoute roles={["DRIVER"]} />}>
                <Route path="driver" element={<DriverDashboard />} />
                <Route path="driver/shipments" element={<ShipmentDetails />} />
                <Route path="driver/update-status" element={<UpdateShipment />} />
                <Route path="driver/proof" element={<ProofUpload />} />
                <Route path="driver/earnings" element={<Earnings />} />
              </Route>

              <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/shipments" element={<ShipmentsTable />} />
                <Route path="admin/assign" element={<AssignDriver />} />
                <Route path="admin/drivers" element={<Drivers />} />
                <Route path="admin/complaints" element={<AdminComplaints />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
