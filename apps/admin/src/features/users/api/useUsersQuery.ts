import { useQuery } from "@tanstack/react-query";

import { USERS_KEY } from ".";

import client from "@/utils/client";

export type UserListItem = NonNullable<
  ReturnType<typeof useUsersQuery>["data"]
>[number];

export const useUsersQuery = () =>
  useQuery({
    queryKey: [USERS_KEY],
    queryFn: async () => {
      const res = await client.admin.users.$get();

      if (!res.ok) {
        throw new Error("error");
      }

      return res.json();
    },
  });
