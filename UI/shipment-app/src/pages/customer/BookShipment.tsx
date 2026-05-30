import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/axios";

const schema = z.object({
  origin: z.string().min(2),
  destination: z.string().min(2),
  weight: z.string(),
});

export default function BookShipment() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/shipments", data),
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <input {...register("origin")} placeholder="Origin" />
      <input {...register("destination")} placeholder="Destination" />
      <input {...register("weight")} placeholder="Weight" />

      <button>Create Shipment</button>
    </form>
  );
}
