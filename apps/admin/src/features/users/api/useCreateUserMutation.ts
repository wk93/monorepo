import { useMutation } from "@tanstack/react-query";

import type { CreateUserSchema } from "@mono/contracts";

import toast from "@/components/feedback/Toast";
import client from "@/utils/client";

export const useCreateUserMutation = () =>
  useMutation({
    mutationFn: async (json: CreateUserSchema) => {
      const res = await client.admin.users.$post({
        json,
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        const data = await res.json();
        toast({ title: "Wystąpił błąd", message: data.message, type: "error" });
        return;
      }
    },
  });
