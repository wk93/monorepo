import { useQuery } from "@tanstack/react-query";

import { ROLES_KEY } from ".";

import client from "@/utils/client";

export type RoleItem = NonNullable<
  ReturnType<typeof useRolesQuery>["data"]
>[number];

export const useRolesQuery = () =>
  useQuery({
    queryKey: [ROLES_KEY],
    queryFn: async () => {
      const res = await client.admin.roles.$get();

      if (!res.ok) {
        throw new Error("error");
      }

      return res.json();
    },
  });
