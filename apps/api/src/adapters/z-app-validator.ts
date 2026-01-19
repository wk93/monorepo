import { zValidator as zv } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import type { ZodType } from "zod";

import { AppError } from "@mono/core";

export const zValidator = <
  T extends ZodType,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T,
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      const firstMessage =
        result.error.issues[0]?.message ?? "Validation error";
      return c.json(new AppError("VALIDATION_ERROR", firstMessage), 400);
    }

    return;
  });
