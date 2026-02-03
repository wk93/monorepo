import { Hono } from "hono";

import { LoginInputSchema, LoginResponseSchema } from "@mono/contracts/auth";
import { CreateUserSchema, UserPublicSchema } from "@mono/contracts/user";

import { zValidator } from "./adapters/z-app-validator";
import { rolesApp } from "./apps/roles-app";
import { authMiddleware } from "./middlewares/auth.middleware";
import { requirePermission } from "./middlewares/permission.middleware";
import type { AuthHonoEnv } from "./types";

export const routes = new Hono<AuthHonoEnv>()
  .get("/", (c) => {
    return c.json({ message: "Hello World!" }, 200);
  })
  .post("/auth/login", zValidator("json", LoginInputSchema), async (c) => {
    const input = c.req.valid("json");

    const { authenticationService } = c.get("services");
    const result = await authenticationService.login(input);

    if (result.ok) {
      return c.json(LoginResponseSchema.parse(result.value), 200);
    } else {
      return c.json(result.error, 401);
    }
  })
  .get("/me", authMiddleware, async (c) => {
    const { userId } = c.get("auth");

    const { userService } = c.get("services");
    const result = await userService.getProfile(userId);

    if (result.ok) {
      const value = {
        ...result.value,
        createdAt: result.value.createdAt.toISOString(),
      };
      return c.json(UserPublicSchema.parse(value), 200);
    } else {
      return c.json(result.error, 401);
    }
  })
  .get(
    "/admin/users",
    authMiddleware,
    requirePermission("users.read", "own"),
    async (c) => {
      const { userService } = c.get("services");
      const result = await userService.list();
      if (result.ok) {
        const mappedUsers = result.value.map((user) =>
          UserPublicSchema.parse({
            ...user,
            createdAt: user.createdAt.toISOString(),
          }),
        );
        return c.json(mappedUsers, 200);
      } else {
        return c.json(result.error, 400);
      }
    },
  )
  .post(
    "/admin/users",
    authMiddleware,
    requirePermission("users.write", "all"),
    zValidator("json", CreateUserSchema),
    async (c) => {
      const input = c.req.valid("json");

      const { userService } = c.get("services");
      const result = await userService.create(input);

      if (result.ok) {
        const value = {
          ...result.value,
          createdAt: result.value.createdAt.toISOString(),
        };
        return c.json(UserPublicSchema.parse(value), 200);
      } else {
        return c.json(result.error, 400);
      }
    },
  )
  .route("/admin/roles", rolesApp);
