import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { Payment } from "../types";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      shipmentId: string;
      customerId: string;
      amount: number;
      paymentMethod: string;
      transactionReference?: string;
    }) => {
      const res = await api.post<Payment>("/shipments/payments", payload);
      return res.data;
    },
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({ queryKey: ["payments", variables.shipmentId] }),
  });
};

export const useGetPayment = (shipmentId?: string) =>
  useQuery({
    queryKey: ["payments", shipmentId],
    enabled: Boolean(shipmentId),
    queryFn: async () => {
      const res = await api.get<Payment[]>(`/shipments/payments/${shipmentId}`);
      return res.data;
    },
  });
