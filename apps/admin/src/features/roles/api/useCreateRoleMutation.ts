import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { CreateRoleSchema } from "@mono/contracts";

import { ROLES_KEY } from ".";

import toast from "@/components/feedback/Toast";
import client from "@/utils/client";

interface Props {
  onSuccess?: () => void;
}

export const useCreateRoleMutation = (props?: Props) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json: CreateRoleSchema) => {
      const res = await client.admin.roles.$post({
        json,
      });

      if (res.ok) {
        const data = await res.json();
        await queryClient.invalidateQueries({
          queryKey: [ROLES_KEY],
        });
        props?.onSuccess?.();
        return data;
      } else {
        const data = await res.json();
        toast({ title: "Wystąpił błąd", message: data.message, type: "error" });
        return;
      }
    },
  });
};
