import { eq, sql } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { PasswordHasher } from "@mono/core";

import type { Schema } from "../db/pg";
import { permissionKeys, roles, userRoles } from "../schema/permissions";
import { usersTable } from "../schema/users";

export interface BootstrapPermissionKey {
  key: string;
  category: string;
  label: string;
  description?: string | null;
}

export interface BootstrapSystemInput {
  db: PostgresJsDatabase<Schema>;
  root: {
    email: string;
    password: string;
  };
  passwordHasher: PasswordHasher;
  permissions?: BootstrapPermissionKey[];
}

export interface BootstrapSystemResult {
  rootId: string;
  rootRoleId: string;
}

export async function bootstrap(
  input: BootstrapSystemInput,
): Promise<BootstrapSystemResult> {
  const { db, root, passwordHasher, permissions = [] } = input;

  return await db.transaction(async (tx) => {
    // 1) Permission catalog
    if (permissions.length > 0) {
      await tx
        .insert(permissionKeys)
        .values(
          permissions.map((p) => ({
            key: p.key,
            category: p.category,
            label: p.label,
            description: p.description ?? null,
          })),
        )
        .onConflictDoUpdate({
          target: permissionKeys.key,
          set: {
            category: sql`excluded.category`,
            label: sql`excluded.label`,
            description: sql`excluded.description`,
          },
        });
    }

    // 2) Root role
    const rootRoleName = "Root";

    const insertedRootRole = await tx
      .insert(roles)
      .values({
        name: rootRoleName,
        hasFullAccess: true,
      })
      .onConflictDoUpdate({
        target: roles.name,
        set: {
          hasFullAccess: sql`excluded.has_full_access`,
        },
      })
      .returning({ id: roles.id });

    const rootRoleId = insertedRootRole[0]?.id ?? null;
    if (!rootRoleId) throw new Error("root role not created");

    // 3) Root
    const existingRoot = await tx.query.usersTable.findFirst({
      where: eq(usersTable.email, root.email),
      columns: { id: true },
    });

    let rootId: string | null = existingRoot?.id ?? null;

    if (!rootId) {
      const passwordHash = await passwordHasher.hash({
        password: root.password,
      });

      const insertedRoot = await tx
        .insert(usersTable)
        .values({
          email: root.email,
          password: passwordHash,
          isActive: true,
        })
        .onConflictDoNothing({ target: usersTable.email })
        .returning({ id: usersTable.id });

      rootId = insertedRoot[0]?.id ?? null;

      // fallback: jeśli konflikt był równoległy, doczytaj id
      if (!rootId) {
        const again = await tx.query.usersTable.findFirst({
          where: eq(usersTable.email, root.email),
          columns: { id: true },
        });
        rootId = again?.id ?? null;
      }
    }

    if (!rootId) throw new Error("root not created");

    // 4 assign root to role
    await tx
      .insert(userRoles)
      .values({ userId: rootId, roleId: rootRoleId })
      .onConflictDoUpdate({
        target: userRoles.userId,
        set: { roleId: rootRoleId },
      });

    return {
      rootId,
      rootRoleId,
    };
  });
}
