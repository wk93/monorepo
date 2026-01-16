import type { AppType } from "@mono/api";
import { hc } from "hono/client";

const client = hc<AppType>("/api");

export default client;
