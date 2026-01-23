import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type { PermissionCatalogRepository, PermissionEntity } from "@mono/core";

import type { Schema } from "../db/pg";

export class DrizzlePermissionCatalogRepository
  implements PermissionCatalogRepository
{
  constructor(private readonly db: PostgresJsDatabase<Schema>) {}

  async list(): Promise<PermissionEntity[]> {
    const permissions = await this.db.query.permissionKeys.findMany({
      columns: { key: true, category: true, description: true, label: true },
    });

    return permissions;
  }
}
