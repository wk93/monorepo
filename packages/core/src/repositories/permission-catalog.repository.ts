import type { PermissionEntity } from "../entities/permission.entity";

export interface PermissionCatalogRepository {
  list(): Promise<PermissionEntity[]>;
}
