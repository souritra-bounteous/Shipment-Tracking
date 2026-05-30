import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { Complaint, ComplaintStatus } from "../types";

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      shipmentId: string;
      customerId: string;
      subject: string;
      description: string;
    }) => {
      const res = await api.post<Complaint>("/shipments/complaints", payload);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["complaints"] }),
  });
};

export const useGetComplaints = () =>
  useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const res = await api.get<Complaint[]>("/shipments/complaints");
      return res.data;
    },
  });

export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      resolution,
    }: {
      id: string;
      status: ComplaintStatus;
      resolution?: string;
    }) => {
      const res = await api.put<Complaint>(`/shipments/complaints/${id}`, {
        status,
        resolution,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["complaints"] }),
  });
};
