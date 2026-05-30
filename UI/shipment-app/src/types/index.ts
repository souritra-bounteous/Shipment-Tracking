export type Role = "ADMIN" | "DRIVER" | "CUSTOMER";

export type ShipmentStatus =
  | "BOOKED"
  | "PACKED"
  | "ASSIGNED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type ComplaintStatus = "OPEN" | "IN_REVIEW" | "RESOLVED" | "REJECTED";

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  role?: Role | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  active?: boolean;
  createdAt?: string;
}

export interface DriverProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  licenseNumber: string;
  vehicleNumber: string;
  vehicleType?: string;
  currentLatitude?: number;
  currentLongitude?: number;
  available: boolean;
  createdAt?: string;
}

export interface Shipment {
  id: string;
  trackingId: string;
  status: ShipmentStatus;
  customerId: string;
  receiverId?: string;
  assignedDriverId?: string;
  origin?: string;
  destination?: string;
  weight?: number;
  dimensions?: string;
  shippingCost?: number;
  expectedDeliveryDate?: string;
  actualDeliveryDate?: string;
  createdAt?: string;
}

export interface DashboardStats {
  totalShipments: number;
  assignedShipments: number;
  deliveredShipments: number;
  cancelledShipments: number;
  totalRevenue: number;
  shipmentsByStatus: Record<ShipmentStatus, number>;
}

export interface Payment {
  id: string;
  shipmentId: string;
  customerId: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod?: string;
  transactionReference?: string;
  paidAt?: string;
  createdAt?: string;
}

export interface DriverEarning {
  id: string;
  shipmentId: string;
  driverId: string;
  amount: number;
  status: "PENDING" | "CALCULATED" | "PAID";
  createdAt?: string;
}

export interface Complaint {
  id: string;
  shipmentId: string;
  customerId: string;
  subject: string;
  description: string;
  status: ComplaintStatus;
  resolution?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  location?: string;
  latitude?: number;
  longitude?: number;
  remarks?: string;
  eventTime?: string;
}

export interface TrackingHistory {
  shipmentId: string;
  events: TrackingEvent[];
}

export interface LiveLocation {
  shipmentId: string;
  latitude: number;
  longitude: number;
  location?: string;
  lastUpdated?: string;
}

export interface ProofOfDelivery {
  id: string;
  shipmentId: string;
  photoFileName?: string;
  photoContentType?: string;
  signatureFileName?: string;
  signatureContentType?: string;
  createdAt?: string;
}
