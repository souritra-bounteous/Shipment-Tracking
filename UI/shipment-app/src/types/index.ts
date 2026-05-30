export type ShipmentStatus =
  | "CREATED"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED";

export interface Shipment {
  id: string;
  trackingId: string;
  status: ShipmentStatus;
}

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  location?: string;
}

export interface AuthResponse {
  accessToken: string;
  role:  "ADMIN" | "DRIVER" | "CUSTOMER" | null;
}
