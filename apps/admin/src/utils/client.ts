import { hc } from "hono/client";

import type { AppType } from "@mono/api";

import { useAuthStore } from "@/store/auth.store";

const client = hc<AppType>("/api", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    const token = useAuthStore.getState().token;
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(input, { ...init, headers });
  },
});

export default client;
