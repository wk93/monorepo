import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { UserRepository } from "@mono/core/repositories/user.repository";

import type { Schema } from "../db/pg";
import { usersTable } from "../schema/users";

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async findByEmail(email: string) {
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

  async findById(id: string) {
    const user = await this.db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        createdAt: true,
      },
      where: eq(usersTable.id, id),
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: null,
      createdAt: user.createdAt,
    };
  }

  async create({
    email,
    passwordHash,
  }: {
    email: string;
    passwordHash: string;
  }) {
    const values = await this.db
      .insert(usersTable)
      .values({
        email,
        password: passwordHash,
      })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        createdAt: usersTable.createdAt,
      });

    const user = values[0];

    if (!user) {
      throw new Error("DB error");
    }

    return {
      id: user.id,
      name: null,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
