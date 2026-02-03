import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { RoleEntity, RoleEntityWithId, RoleRepository } from "@mono/core";

import type { Schema } from "../db/pg";
import { roles } from "../schema/permissions";

export class DrizzleRoleRepository implements RoleRepository {
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

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

  async findById(id: string): Promise<RoleEntityWithId | null> {
    const role = await this.db.query.roles.findFirst({
      where: eq(roles.id, id),
    });

    if (!role) {
      return null;
    }

    return role;
  }

  async create(data: RoleEntity): Promise<RoleEntityWithId> {
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
