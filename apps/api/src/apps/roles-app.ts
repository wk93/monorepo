import { Hono } from "hono";

import {
  CreateRoleSchema,
  PermissionCategorySchema,
  RolePublicSchema,
} from "@mono/contracts";

import { zValidator } from "../adapters/z-app-validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permission.middleware";
import type { AuthHonoEnv } from "../types";

export const rolesApp = new Hono<AuthHonoEnv>()
  .get(
    "/",
    authMiddleware,
    requirePermission("roles.read", "all"),
    async (c) => {
      const { roleService } = c.get("services");
      const result = await roleService.list();

      if (result.ok) {
        const mappedRoles = result.value.map((role) =>
          RolePublicSchema.parse(role),
        );
        return c.json(mappedRoles, 200);
      } else {
        return c.json(result.error, 400);
      }
    },
  )
  .post(
    "/",
    authMiddleware,
    requirePermission("roles.write", "all"),
    zValidator("json", CreateRoleSchema),
    async (c) => {
      const input = c.req.valid("json");

      const { roleService } = c.get("services");
      const result = await roleService.create(input);

      if (result.ok) {
        return c.json(RolePublicSchema.parse(result.value), 200);
      } else {
        return c.json(result.error, 400);
      }
    },
  )
  .get(
    "/permissions",
    authMiddleware,
    requirePermission("roles.write", "all"),
    async (c) => {
      const { roleService } = c.get("services");
      const result = await roleService.listOfPermissions();

      if (result.ok) {
        const transformedPermissions = roleService.groupPermissionsByCategory(
          result.value,
        );
        const mappedPermissions = transformedPermissions.map((role) =>
          PermissionCategorySchema.parse(role),
        );

        return c.json(mappedPermissions, 200);
      } else {
        return c.json(result.error, 400);
      }
    },
  );
