import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/store/auth.store";
import client from "@/utils/client";

export const useProfileQuery = () => {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["profile", token],
    retry: false,
    queryFn: async () => {
      const res = await client.me.$get();
      if (!res.ok) {
        throw new Error("error");
      }
      return res.json();
    },
  });
};
