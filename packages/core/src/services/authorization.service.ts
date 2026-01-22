import type {
  GrantedPermissionValue,
  PermissionValue,
} from "../entities/permission.entity";
import type { RolePermissionRepository } from "../repositories/role-permission.repository";
import type { UserRoleRepository } from "../repositories/user-role.repository";

interface CachedRolePerms {
  expiresAt: number;
  values: Map<string, GrantedPermissionValue | null>;
}

function satisfies(required: GrantedPermissionValue, actual: PermissionValue) {
  if (required === "all") return actual === "all";
  return actual === "all" || actual === "own";
}

export class AuthorizationService {
  private readonly cache = new Map<string, CachedRolePerms>();
  private readonly ttlMs = 60_000;

  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly rolePermissionRepository: RolePermissionRepository,
  ) {}

  getUserRole({ userId }: { userId: string }) {
    return this.userRoleRepository.getUserRole({ userId });
  }

  async hasPermissionByRole(data: {
    roleId: string;
    permissionKey: string;
    required: GrantedPermissionValue;
  }): Promise<boolean> {
    const now = Date.now();
    const cached = this.cache.get(data.roleId);

    if (cached && cached.expiresAt > now) {
      const scope = cached.values.get(data.permissionKey) ?? null;
      const actual: PermissionValue = scope ?? "none";
      return satisfies(data.required, actual);
    }

    const scope = await this.rolePermissionRepository.getRolePermission({
      roleId: data.roleId,
      permissionKey: data.permissionKey,
    });
    const entry: CachedRolePerms =
      cached && cached.expiresAt > now
        ? cached
        : { expiresAt: now + this.ttlMs, values: new Map() };

    entry.values.set(data.permissionKey, scope ?? null);
    this.cache.set(data.roleId, entry);

    const actual: PermissionValue = scope ?? "none";
    return satisfies(data.required, actual);
  }

  invalidateRole(roleId: string) {
    this.cache.delete(roleId);
  }
}
