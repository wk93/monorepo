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

  async getRolePermission({
    roleId,
    permissionKey,
  }: {
    roleId: string;
    permissionKey: string;
  }): Promise<GrantedPermissionValue | null> {
    const row = await this.db.query.rolePermissions.findFirst({
      where: and(
        eq(rolePermissions.roleId, roleId),
        eq(rolePermissions.permissionKey, permissionKey),
      ),
      columns: { scope: true },
    });

    return row?.scope ?? null;
  }

  async getRolePermissions({
    roleId,
  }: {
    roleId: string;
  }): Promise<Record<string, GrantedPermissionValue>> {
    const permissions = await this.db.query.rolePermissions.findMany({
      where: eq(rolePermissions.roleId, roleId),
    });

    const out: Record<string, GrantedPermissionValue> = {};
    for (const p of permissions) out[p.permissionKey] = p.scope;
    return out;
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
      return;
    }

    await this.db
      .insert(rolePermissions)
      .values({
        roleId: data.roleId,
        permissionKey: data.permissionKey,
        scope: data.value, // "own" | "all"
      })
      .onConflictDoUpdate({
        target: [rolePermissions.roleId, rolePermissions.permissionKey],
        set: { scope: data.value },
      });
  }
}
