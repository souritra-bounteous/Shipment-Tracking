import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { DashboardStats, DriverEarning, Shipment, ShipmentStatus } from "../types";

export const useCreateShipment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await api.post<Shipment>("/shipments", payload);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["shipments"] }),
  });
};

export const useCustomerShipments = (customerId?: string) =>
  useQuery({
    queryKey: ["shipments", "customer", customerId],
    enabled: Boolean(customerId),
    queryFn: async () => {
      const res = await api.get<Shipment[]>(`/shipments/customer/${customerId}`);
      return res.data;
    },
  });

export const useDriverShipments = (driverId?: string) =>
  useQuery({
    queryKey: ["shipments", "driver", driverId],
    enabled: Boolean(driverId),
    queryFn: async () => {
      const res = await api.get<Shipment[]>(`/shipments/driver/${driverId}`);
      return res.data;
    },
  });

export const useAllShipments = () =>
  useQuery({
    queryKey: ["shipments"],
    queryFn: async () => {
      const res = await api.get<Shipment[]>("/shipments");
      return res.data;
    },
  });

export const useShipmentByTrackingId = (trackingId?: string) =>
  useQuery({
    queryKey: ["shipments", "tracking", trackingId],
    enabled: Boolean(trackingId),
    queryFn: async () => {
      const res = await api.get<Shipment>(`/shipments/${trackingId}`);
      return res.data;
    },
  });

export const useAssignDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ shipmentId, driverId }: { shipmentId: string; driverId: string }) => {
      const res = await api.put<Shipment>(`/shipments/${shipmentId}/assign`, { driverId });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["shipments"] }),
  });
};

export const useUpdateShipmentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      shipmentId,
      status,
    }: {
      shipmentId: string;
      status: ShipmentStatus;
    }) => {
      const res = await api.put<Shipment>(`/shipments/${shipmentId}/status`, { status });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["shipments"] }),
  });
};

export const useDashboardStats = () =>
  useQuery({
    queryKey: ["shipments", "dashboard"],
    queryFn: async () => {
      const res = await api.get<DashboardStats>("/shipments/admin/dashboard");
      return res.data;
    },
  });

export const useDriverEarnings = (driverId?: string) =>
  useQuery({
    queryKey: ["shipments", "earnings", driverId],
    enabled: Boolean(driverId),
    queryFn: async () => {
      const res = await api.get<DriverEarning[]>(`/shipments/earnings/${driverId}`);
      return res.data;
    },
  });
