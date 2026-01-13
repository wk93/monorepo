import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";

import { LoginInputSchema, LoginResponseSchema } from "@mono/contracts/auth";
import { UserPublicSchema } from "@mono/contracts/user";

import { authMiddleware } from "./middlewares/auth.middleware";
import type { AuthHonoEnv } from "./types";

export const routes = new Hono<AuthHonoEnv>()
  .post("/auth/login", zValidator("json", LoginInputSchema), async (c) => {
    const input = c.req.valid("json");
    const container = c.get("container");

    const out = await container.services.authService.login(input);
    return c.json(LoginResponseSchema.parse(out), 200);
  })
  .get("/me", authMiddleware, async (c) => {
    const { sub } = c.get("auth");
    const container = c.get("container");

    const profile = await container.services.userService.getProfile(sub);
    return c.json(UserPublicSchema.parse(profile), 200);
  });
