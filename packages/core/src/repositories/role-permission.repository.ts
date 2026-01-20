import type {
  GrantedPermissionValue,
  PermissionValue,
} from "../entities/permission.entity";

export interface RolePermissionRepository {
  getRolePermissions(data: {
    roleId: string;
  }): Promise<Record<string, GrantedPermissionValue>>;

  setRolePermission(data: {
    roleId: string;
    permissionKey: string;
    value: PermissionValue;
  }): Promise<void>;
}
