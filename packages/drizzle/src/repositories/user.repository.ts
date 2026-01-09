import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { UserEntity } from "@mono/core/entities/user.entity";
import type { UserRepository } from "@mono/core/repositories/user.repository";

import { usersTable } from "../schema/users";

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: PostgresJsDatabase) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const rows = await this.db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        password: usersTable.password,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    const row = rows[0];
    if (!row) return null;

    return {
      id: row.id,
      email: row.email,
      name: null,
      passwordHash: row.password,
      createdAt: row.createdAt,
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const rows = await this.db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        password: usersTable.password,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    const row = rows[0];
    if (!row) return null;

    return {
      id: row.id,
      email: row.email,
      name: null,
      passwordHash: row.password,
      createdAt: row.createdAt,
    };
  }
}
