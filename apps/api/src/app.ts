import { Hono } from "hono";

import { containerMiddleware } from "./middlewares/container.middleware";
import { buildContainer } from "./container";
import { readEnv } from "./env";
import { routes } from "./routes";
import type { HonoEnv } from "./types";

const env = readEnv(process.env as Record<string, unknown>);
const container = buildContainer(env);

export const apiApp = new Hono<HonoEnv>()
  .use(containerMiddleware(container))
  .route("/api", routes);
