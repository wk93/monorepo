import { createMiddleware } from "hono/factory";

import { AppError } from "@mono/core/errors/app-error";

import type { AuthHonoEnv } from "../types";

export const authMiddleware = createMiddleware<AuthHonoEnv>(
  async (c, next): Promise<void> => {
    const header = c.req.header("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";

    if (!token) {
      throw new AppError("UNAUTHORIZED", "Missing token");
    }

    const { tokenService } = c.get("services");
    const payload = await tokenService.verifyAccessToken(token);
    c.set("auth", payload);

    await next();
  },
);
