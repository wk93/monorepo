import { createMiddleware } from "hono/factory";

import type { GrantedPermissionValue } from "@mono/core/entities/permission.entity";

import type { AuthHonoEnv } from "../types";

export const requirePermission = (
  permissionKey: string,
  required: GrantedPermissionValue,
) =>
  createMiddleware<AuthHonoEnv>(async (c, next) => {
    const { authorizationService } = c.get("services");
    const auth = c.get("auth");

    if (!auth.roleId) {
      return c.json({ code: "UNAUTHORIZED", message: "No role assigned" }, 403);
    }

    const ok = await authorizationService.hasPermissionByRole({
      roleId: auth.roleId,
      permissionKey,
      required,
    });

    if (!ok) {
      return c.json(
        { code: "UNAUTHORIZED", message: "Permission denied" },
        403,
      );
    }

    await next();
    return;
  });
