import { eq, sql } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { InitRoles, RoleEntity, RoleRepository } from "@mono/core";

import type { Schema } from "../db/pg";
import { roles } from "../schema/permissions";

export class DrizzleRoleRepository implements RoleRepository {
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async init(data: InitRoles): Promise<{ rootRoleId: string }> {
    const root = data.root;

    const inserted = await this.db
      .insert(roles)
      .values({
        name: root.name,
        description: root.description,
        hasFullAccess: true,
      })
      .onConflictDoUpdate({
        target: roles.name,
        set: {
          description: sql`excluded.description`,
          hasFullAccess: sql`excluded.has_full_access`,
        },
      })
      .returning({ id: roles.id });

    const rootRoleId = inserted[0]?.id ?? null;
    if (!rootRoleId) throw new Error("Root role not created");

    return { rootRoleId };
  }

  async getFlags({ roleId }: { roleId: string }) {
    const row = await this.db.query.roles.findFirst({
      where: eq(roles.id, roleId),
      columns: { hasFullAccess: true },
    });
    return row ?? null;
  }

  async list(): Promise<(RoleEntity & { id: string })[]> {
    const roles = await this.db.query.roles.findMany();

    return roles;
  }

  async get({
    id,
  }: {
    id: string;
  }): Promise<(RoleEntity & { id: string }) | null> {
    const role = await this.db.query.roles.findFirst({
      where: eq(roles.id, id),
    });

    if (!role) {
      return null;
    }

    return role;
  }

  async create(data: RoleEntity): Promise<RoleEntity & { id: string }> {
    const insertedRows = await this.db
      .insert(roles)
      .values({
        name: data.name,
        description: data.description,
      })
      .returning();

    if (!insertedRows[0]) {
      throw new Error("Role not created");
    }

    return {
      id: insertedRows[0].id,
      name: insertedRows[0].name,
      description: insertedRows[0].description,
    };
  }

  async update({
    id,
    ...data
  }: Partial<RoleEntity> & { id: string }): Promise<
    RoleEntity & { id: string }
  > {
    const updatedRows = await this.db
      .update(roles)
      .set(data)
      .where(eq(roles.id, id))
      .returning();

    if (!updatedRows[0]) {
      throw new Error("Role not updated");
    }

    return {
      id: updatedRows[0].id,
      name: updatedRows[0].name,
      description: updatedRows[0].description,
    };
  }

  async remove({ id }: { id: string }): Promise<void> {
    await this.db.delete(roles).where(eq(roles.id, id));
  }
}
