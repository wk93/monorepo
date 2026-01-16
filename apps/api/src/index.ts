import { apiApp } from "./app";
import { readEnv } from "./env";
import type { routes } from "./routes";

const env = readEnv(process.env as Record<string, unknown>);

export default apiApp;
export type AppType = typeof routes;

Bun.serve({
  port: env.PORT,
  fetch: apiApp.fetch,
});
