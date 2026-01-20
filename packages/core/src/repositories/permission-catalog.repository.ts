import type { PermissionEntity } from "../entities/permission.entity";

export interface InitPermissionCatalog {
  permissions: PermissionEntity[];
}

export interface PermissionCatalogRepository {
  init(data: InitPermissionCatalog): Promise<void>;
  list(): Promise<PermissionEntity[]>;
}
