import { useDrivers, useUsers } from "./useAuth";
import { useAuthStore } from "../store/authStore";

export const useCurrentUser = () => {
  const email = useAuthStore((s) => s.email);
  const role = useAuthStore((s) => s.role);
  const users = useUsers();
  const drivers = useDrivers();

  const user = users.data?.find((item) => item.email === email);
  const driver = drivers.data?.find((item) => item.email === email || item.userId === user?.id);

  return {
    email,
    role,
    user,
    driver,
    isLoading: users.isLoading || (role === "DRIVER" && drivers.isLoading),
  };
};
