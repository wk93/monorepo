import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { UserRoleRepository } from "@mono/core/repositories/user-role.repository";

import type { Schema } from "../db/pg";
import { userRoles } from "../schema/permissions";

export class DrizzleUserRoleRepository implements UserRoleRepository {
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async getUserRole({
    userId,
  }: {
    userId: string;
  }): Promise<{ roleId: string; hasFullAccess: boolean } | null> {
    const row = await this.db.query.userRoles.findFirst({
      where: eq(userRoles.userId, userId),
      columns: {
        roleId: true,
      },
      with: {
        role: {
          columns: { hasFullAccess: true },
        },
      },
    });

    if (!row) return null;

    return {
      roleId: row.roleId,
      hasFullAccess: row.role.hasFullAccess,
    };
  }

  async setUserRole({
    userId,
    roleId,
  }: {
    userId: string;
    roleId: string;
  }): Promise<void> {
    await this.db
      .insert(userRoles)
      .values({ userId, roleId })
      .onConflictDoUpdate({
        target: userRoles.userId,
        set: { roleId },
      });
  }
}
