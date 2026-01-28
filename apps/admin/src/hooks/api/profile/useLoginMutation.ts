import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import type { LoginInput } from "@mono/contracts/auth";

import toast from "@/components/feedback/Toast";
import { useAuthStore } from "@/store/auth.store";
import client, { HttpError, unwrapJson } from "@/utils/client";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: (value: LoginInput) =>
      unwrapJson(client.auth.login.$post({ json: value })),

    onSuccess: async (data) => {
      setToken(data.accessToken);
      await queryClient.invalidateQueries();
      await navigate({ to: "/" });
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        toast({ type: "error", title: err.message });
        return;
      }
      toast({ type: "error", title: "Niepoprawne logowanie" });
    },
  });
};
