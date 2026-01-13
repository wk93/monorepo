import type { MiddlewareHandler } from "hono";

import { AppError } from "@mono/core/errors/app-error";

export const errorMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof AppError) {
      return c.json({ error: e.code, message: e.message }, e.status);
    }
    return c.json({ error: "INTERNAL_ERROR", message: "Internal error" }, 500);
  }
};
