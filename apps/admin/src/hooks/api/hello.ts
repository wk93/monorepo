import { useQuery } from "@tanstack/react-query";

import client from "../../utils/client";

export const useHelloQuery = () => {
  const query = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await client.index.$get();

      return res.json();
    },
  });

  return query;
};
