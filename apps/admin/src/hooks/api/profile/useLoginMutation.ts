import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import type { LoginInput } from "@mono/contracts/auth";

import { useAuthStore } from "@/store/auth.store";
import client from "@/utils/client";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: async (value: LoginInput) => {
      const res = await client.auth.login.$post({ json: value });

      if (!res.ok) {
        const error = await res.json();
        console.warn(error);
        return null;
      }

      return res.json();
    },

    onSuccess: async (data) => {
      if (data) {
        setToken(data.accessToken);
        queryClient.clear();
        await queryClient.invalidateQueries();
        await navigate({ to: "/" });
      }
    },
  });
};
