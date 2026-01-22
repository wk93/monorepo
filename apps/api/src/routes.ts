import { Hono } from "hono";

import { LoginInputSchema, LoginResponseSchema } from "@mono/contracts/auth";
import { UserPublicSchema } from "@mono/contracts/user";

import { zValidator } from "./adapters/z-app-validator";
import { authMiddleware } from "./middlewares/auth.middleware";
import { requirePermission } from "./middlewares/permission.middleware";
import type { AuthHonoEnv } from "./types";

export const routes = new Hono<AuthHonoEnv>()
  .get("/", (c) => {
    return c.json({ message: "Hello World!" }, 200);
  })
  .post("/auth/login", zValidator("json", LoginInputSchema), async (c) => {
    const input = c.req.valid("json");
    const { authService } = c.get("services");

    try {
      const result = await authService.login(input);
      if (result.ok) {
        return c.json(LoginResponseSchema.parse(result.value), 200);
      } else {
        return c.json(result.error, 401);
      }
    } catch (error) {
      return c.json(error, 401);
    }
  })
  .get("/me", authMiddleware, async (c) => {
    const { userId } = c.get("auth");
    const { userService } = c.get("services");

    const result = await userService.getProfile(userId);
    if (result.ok) {
      return c.json(UserPublicSchema.parse(result.value), 200);
    } else {
      return c.json(result.error, 401);
    }
  })
  .get(
    "/admin/users",
    authMiddleware,
    requirePermission("users.read", "own"),
    (c) => {
      return c.json({ ok: true });
    },
  );
