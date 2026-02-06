import { useQuery } from "@tanstack/react-query";

import { PERMISSIONS_KEY } from ".";

import client from "@/utils/client";

export type PermissionItem = NonNullable<
  ReturnType<typeof usePermissionListQuery>["data"]
>[number];

export const usePermissionListQuery = () =>
  useQuery({
    queryKey: [PERMISSIONS_KEY],
    queryFn: async () => {
      const res = await client.admin.roles.permissions.$get();

      if (!res.ok) {
        throw new Error("error");
      }

      return res.json();
    },
  });
