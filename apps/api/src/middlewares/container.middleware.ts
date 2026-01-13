import { createMiddleware } from "hono/factory";

import type { Container } from "../container";
import type { HonoEnv } from "../types";

export const containerMiddleware = (container: Container) =>
  createMiddleware<HonoEnv>(async (c, next) => {
    c.set("container", container);

    await next();
  });
