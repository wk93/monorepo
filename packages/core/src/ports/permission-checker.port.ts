import type { PermissionValue } from "../entities/permission.entity";

export interface PermissionChecker {
  check(data: {
    userId: string;
    permissionKey: string;
  }): Promise<PermissionValue>;
}
