import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { bootstrap } from "@mono/drizzle";

import { handleError } from "./adapters/error.handler";
import { BunPasswordHasher } from "./adapters/password-hasher";
import { servicesMiddleware } from "./middlewares/services.middleware";
import { readEnv } from "./env";
import { routes } from "./routes";
import { buildServices } from "./services";
import type { HonoEnv } from "./types";

const env = readEnv(process.env as Record<string, unknown>);
const services = buildServices(env);

await bootstrap({
  db: services.db,
  passwordHasher: new BunPasswordHasher(),
  root: {
    email: env.ROOT_EMAIL,
    password: env.ROOT_PASSWORD,
  },
  permissions: [{ key: "users.read", category: "Users", label: "Read users" }],
});

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
