import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type {
  InitPermissionCatalog,
  PermissionCatalogRepository,
  PermissionEntity,
} from "@mono/core";

import type { Schema } from "../db/pg";
import { permissionKeys } from "../schema/permissions";

export class DrizzlePermissionCatalogRepository
  implements PermissionCatalogRepository
{
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async init({ permissions }: InitPermissionCatalog): Promise<void> {
    await this.db
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
          category: permissionKeys.category,
          label: permissionKeys.label,
          description: permissionKeys.description,
        },
      });
  }

  async list(): Promise<PermissionEntity[]> {
    const permissions = await this.db.query.permissionKeys.findMany({
      columns: { key: true, category: true, description: true, label: true },
    });

    return permissions;
  }
}
