import { and, eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type {
  GrantedPermissionValue,
  PermissionValue,
  RolePermissionRepository,
} from "@mono/core";

import type { Schema } from "../db/pg";
import { rolePermissions } from "../schema/permissions";

export class DrizzleRolePermissionRepository
  implements RolePermissionRepository
{
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async getRolePermissions({
    roleId,
  }: {
    roleId: string;
  }): Promise<Record<string, GrantedPermissionValue>> {
    const permissions = await this.db.query.rolePermissions.findMany({
      where: eq(rolePermissions.roleId, roleId),
    });

    return permissions.reduce<Record<string, GrantedPermissionValue>>(
      (prev, curr) => ({ ...prev, [curr.permissionKey]: curr.scope }),
      {},
    );
  }

  async setRolePermission(data: {
    roleId: string;
    permissionKey: string;
    value: PermissionValue;
  }): Promise<void> {
    const condition = and(
      eq(rolePermissions.roleId, data.roleId),
      eq(rolePermissions.permissionKey, data.permissionKey),
    );

    if (data.value === "none") {
      await this.db.delete(rolePermissions).where(condition);
    } else {
      await this.db
        .update(rolePermissions)
        .set({ scope: data.value })
        .where(condition);
    }
  }
}
