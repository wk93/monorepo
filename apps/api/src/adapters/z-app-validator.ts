import { zValidator as zv } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import type { ZodType } from "zod";

import type { AppError } from "@mono/core";

export const zValidator = <
  TTarget extends keyof ValidationTargets,
  TSchema extends ZodType,
>(
  target: TTarget,
  schema: TSchema,
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      const firstMessage =
        result.error.issues[0]?.message ?? "Validation error";
      const err: AppError = { code: "VALIDATION_ERROR", message: firstMessage };
      return c.json(err, 400);
    }

    return;
  });
