import type { RoleWithPermissions } from "../entities/role.entity";

export interface RoleQuery {
  getRoleWithPermissions(data: {
    roleId: string;
  }): Promise<RoleWithPermissions | null>;
  getUserRoleWithPermissions(data: {
    userId: string;
  }): Promise<RoleWithPermissions | null>;
}
