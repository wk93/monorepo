import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { handleError } from "./adapters/error.handler";
import { servicesMiddleware } from "./middlewares/services.middleware";
import { readEnv } from "./env";
import { routes } from "./routes";
import { buildServices } from "./services";
import type { HonoEnv } from "./types";

const env = readEnv(process.env as Record<string, unknown>);
const services = await buildServices(env);

export const apiApp = new Hono<HonoEnv>()
  .onError(handleError)
  .use(servicesMiddleware(services))
  .route("/api", routes)
  .use(
    "/admin/*",
    serveStatic({
      root: "../admin/dist",
      rewriteRequestPath: (path) => path.replace(/^\/admin/, ""),
    }),
  )
  .get(
    "/admin/*",
    serveStatic({
      root: "../admin/dist",
      path: "index.html",
    }),
  );
