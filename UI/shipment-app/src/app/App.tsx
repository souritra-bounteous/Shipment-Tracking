import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "../layouts/Sidebar";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Login from "../pages/auth/Login";
import BookShipment from "../pages/customer/BookShipment";
import TrackShipment from "../pages/customer/TrackShipment";
import UpdateShipment from "../pages/driver/UpdateShipment";
import AdminDashboard from "../pages/admin/Dashboard";
import ShipmentsTable from "../pages/admin/ShipmentsTable";
import { useThemeStore } from "../store/themeStore";
import MainLayout from "./MainLayout";

const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <div className="flex">
//           <Sidebar />
//           <div className="p-6 w-full">
//             <Routes>
//               <Route path="/login" element={<Login />} />

//               <Route
//                 path="/customer"
//                 element={
//                   <ProtectedRoute>
//                     <BookShipment />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/track"
//                 element={
//                   <ProtectedRoute>
//                     <TrackShipment />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/driver"
//                 element={
//                   <ProtectedRoute>
//                     <UpdateShipment />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* <Route path="/live" element={<LiveTracking />} /> */}
//               <Route
//                 path="/admin"
//                 element={
//                   <ProtectedRoute>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/shipments"
//                 element={
//                   <ProtectedRoute>
//                     <ShipmentsTable />
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </div>
//         </div>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED + LAYOUT */}
          <Route path="/" element={<MainLayout />}>

            <Route path="admin" element={<AdminDashboard />} />
            
          </Route>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}


// export default function App() {
//   const mode = useThemeStore((s) => s.mode);

//   return (
//     <div className={mode === "dark" ? "dark" : ""}>
     

//     <BrowserRouter>
//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/login" element={<Login />} />

//         {/* PROTECTED + LAYOUT */}
//         <Route path="/" element={<MainLayout />}>

//           {/* <Route path="customer" element={<CustomerDashboard />} /> */}
//           <Route path="admin" element={<AdminDashboard />} />
//           {/* <Route path="driver" element={<DriverDashboard />} /> */}

//           {/* Default route */}
//           <Route index element={<Navigate to="/customer" />} />

//         </Route>

//         {/* fallback */}
//         <Route path="*" element={<Navigate to="/customer" />} />
//       </Routes>
//     </BrowserRouter>


//     </div>
//   );
// }
