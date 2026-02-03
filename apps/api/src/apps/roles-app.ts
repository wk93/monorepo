import { Hono } from "hono";

import { RolePublicSchema } from "@mono/contracts";

import { authMiddleware } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permission.middleware";
import type { AuthHonoEnv } from "../types";

export const rolesApp = new Hono<AuthHonoEnv>().get(
  "/",
  authMiddleware,
  requirePermission("roles.read", "all"),
  async (c) => {
    const { rolesService } = c.get("services");
    const result = await rolesService.list();

    if (result.ok) {
      const mappedRoles = result.value.map((role) =>
        RolePublicSchema.parse(role),
      );
      return c.json(mappedRoles, 200);
    } else {
      return c.json(result.error, 400);
    }
  },
);
