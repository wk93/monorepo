import { apiApp } from "./app";
import { readEnv } from "./env";

const env = readEnv(process.env as Record<string, unknown>);

export default apiApp;
export type AppType = typeof apiApp;

Bun.serve({
  port: env.PORT,
  fetch: apiApp.fetch,
});
