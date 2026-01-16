import type { Context } from "hono";

import { AppError } from "@mono/core/errors/app-error";

export function handleError(err: unknown, c: Context) {
  if (err instanceof AppError) {
    return c.json({ error: err.code, message: err.message }, err.status);
  }

  return c.json({ error: "INTERNAL_ERROR", message: "Internal error" }, 500);
}
