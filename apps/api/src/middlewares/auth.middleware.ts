import { createMiddleware } from "hono/factory";

import type { AppError } from "@mono/core/entities/basic.entity";

import type { AuthHonoEnv } from "../types";

export const authMiddleware = createMiddleware<AuthHonoEnv>(async (c, next) => {
  const header = c.req.header("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    const err: AppError = { code: "UNAUTHORIZED", message: "Missing token" };
    return c.json(err, 401);
  }

  const { tokenService } = c.get("services");
  const payload = await tokenService.verifyAccessToken(token);
  c.set("auth", payload);

  await next();
  return;
});
