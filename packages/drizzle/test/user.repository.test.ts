import { PGlite } from "@electric-sql/pglite";
import { beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/pglite";

import { DrizzleUserRepository } from "../src/repositories/user.repository";
import { usersTable } from "../src/schema/users";

describe("drizzle/DrizzleUserRepository (pglite)", () => {
  let db: ReturnType<typeof drizzle>;

  beforeAll(async () => {
    const client = new PGlite();
    db = drizzle(client);

    // DDL tylko raz
    await db.execute(sql`create type user_type as enum ('admin', 'user');`);

    await db.execute(sql`
      create table users (
        id uuid primary key,
        email varchar(255) not null,
        password varchar(255) not null,
        type user_type not null,
        is_active boolean not null default false,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );
    `);

    await db.execute(
      sql`create unique index users_email_unique on users(email);`,
    );
    await db.execute(sql`create index users_email_idx on users(email);`);
  });

  beforeEach(async () => {
    // szybki reset danych między testami
    await db.execute(sql`truncate table users;`);
  });

  test("db has expected indexes (catalog)", async () => {
    const rows = await db.execute(sql`
      select indexname
      from pg_indexes
      where schemaname = 'public'
        and tablename = 'users'
    `);

    const names = (rows as any).rows?.map((r: any) => r.indexname) ?? [];
    expect(names).toContain("users_email_unique");
    expect(names).toContain("users_email_idx");
  });

  test("unique email is enforced", async () => {
    await db
      .insert(usersTable)
      .values({
        id: "00000000-0000-0000-0000-000000000010",
        email: "dup@example.com",
        password: "hash",
        isActive: true,
      })
      .execute();

    await expect(
      db
        .insert(usersTable)
        .values({
          id: "00000000-0000-0000-0000-000000000011",
          email: "dup@example.com",
          password: "hash2",
          isActive: true,
        })
        .execute(),
    ).rejects.toBeTruthy();

    const rows = await db.execute(sql`
      select count(*)::int as c
      from users
      where email = 'dup@example.com'
    `);

    expect((rows as any).rows?.[0]?.c).toBe(1);
  });

  test("findByEmail returns null when missing", async () => {
    const repo = new DrizzleUserRepository(db as any);
    expect(await repo.findByEmail("missing@example.com")).toBeNull();
  });

  test("findByEmail returns mapped entity", async () => {
    await db
      .insert(usersTable)
      .values({
        id: "00000000-0000-0000-0000-000000000001",
        email: "user@example.com",
        password: "hash",
        isActive: true,
      })
      .execute();

    const repo = new DrizzleUserRepository(db as any);
    const res = await repo.findByEmail("user@example.com");

    expect(res).not.toBeNull();
    expect(res!.email).toBe("user@example.com");
  });

  test("findById returns null when missing", async () => {
    const repo = new DrizzleUserRepository(db as any);
    expect(
      await repo.findById("00000000-0000-0000-0000-000000000099"),
    ).toBeNull();
  });

  test("findById returns mapped entity", async () => {
    await db
      .insert(usersTable)
      .values({
        id: "00000000-0000-0000-0000-000000000002",
        email: "admin@example.com",
        password: "hash2",
        isActive: false,
      })
      .execute();

    const repo = new DrizzleUserRepository(db as any);
    const res = await repo.findById("00000000-0000-0000-0000-000000000002");

    expect(res).not.toBeNull();
    expect(res!.email).toBe("admin@example.com");
  });
});
