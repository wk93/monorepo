import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { UserRoleRepository } from "@mono/core/repositories/user-role.repository";

import type { Schema } from "../db/pg";
import { userRoles } from "../schema/permissions";

export class DrizzleUserRoleRepository implements UserRoleRepository {
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async getUserRoleId(data: { userId: string }): Promise<string | null> {
    const role = await this.db.query.userRoles.findFirst({
      where: eq(userRoles.userId, data.userId),
    });

    return role?.roleId ?? null;
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
