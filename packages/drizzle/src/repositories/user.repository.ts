import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { UserEntity } from "@mono/core/entities/user.entity";
import type { UserRepository } from "@mono/core/repositories/user.repository";

import type { Schema } from "../db/pg";
import { usersTable } from "../schema/users";

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
      },
      where: eq(usersTable.email, email),
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: null,
      passwordHash: user.password,
      createdAt: user.createdAt,
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
      },
      where: eq(usersTable.id, id),
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: null,
      passwordHash: user.password,
      createdAt: user.createdAt,
    };
  }
}
