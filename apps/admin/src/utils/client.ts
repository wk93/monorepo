import { hc } from "hono/client";

import type { AppType } from "@mono/api";

const client = hc<AppType>("/api");

export default client;
