import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { LiveLocation, ProofOfDelivery, TrackingHistory } from "../types";

export const useTrackingHistory = (shipmentId?: string) =>
  useQuery({
    queryKey: ["tracking", "history", shipmentId],
    enabled: Boolean(shipmentId),
    queryFn: async () => {
      const res = await api.get<TrackingHistory>(`/tracking/shipment/${shipmentId}`);
      return res.data;
    },
  });

export const useShipmentLocation = (shipmentId?: string) =>
  useQuery({
    queryKey: ["tracking", "location", shipmentId],
    enabled: Boolean(shipmentId),
    queryFn: async () => {
      const res = await api.get<LiveLocation>(`/tracking/location/${shipmentId}`);
      return res.data;
    },
  });

export const useUploadProof = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      shipmentId,
      photo,
      signature,
    }: {
      shipmentId: string;
      photo: File;
      signature: File;
    }) => {
      const formData = new FormData();
      formData.append("shipmentId", shipmentId);
      formData.append("photo", photo);
      formData.append("signature", signature);
      const res = await api.post<ProofOfDelivery>("/tracking/proof", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ["tracking", "history", variables.shipmentId] }),
  });
};
