import { createMiddleware } from "hono/factory";

import type { Services } from "../services";
import type { HonoEnv } from "../types";

export const servicesMiddleware = (services: Services) =>
  createMiddleware<HonoEnv>(async (c, next) => {
    c.set("services", services);
    await next();
  });
