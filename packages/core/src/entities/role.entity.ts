import type { PermissionValue } from "./permission.entity";

export interface RoleEntity {
  name: string;
  description?: string;
}

export type RoleEntityWithId = RoleEntity & { id: string };

export type RoleWithPermissions = RoleEntityWithId & {
  permissions: Record<string, PermissionValue>;
};
