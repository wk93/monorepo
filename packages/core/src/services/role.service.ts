import type { PermissionEntity } from "../entities";
import type {
  PermissionCatalogRepository,
  RoleRepository,
} from "../repositories";
import { err, ok } from "../shared";

export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionCatalogRepository: PermissionCatalogRepository,
  ) {}

  groupPermissionsByCategory(permissions: PermissionEntity[]) {
    const map = new Map<string, Omit<PermissionEntity, "category">[]>();

    for (const p of permissions) {
      const category = map.get(p.category);

      if (category) {
        category.push({
          key: p.key,
          label: p.label,
          description: p.description,
        });
      } else {
        map.set(p.category, [
          { key: p.key, label: p.label, description: p.description },
        ]);
      }
    }

    return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
  }

  async list() {
    try {
      const roles = await this.roleRepository.list();
      return ok(roles);
    } catch {
      return err("INTERNAL", "Internal error");
    }
  }

  async listOfPermissions() {
    try {
      const permissions = await this.permissionCatalogRepository.list();
      return ok(permissions);
    } catch {
      return err("INTERNAL", "Internal error");
    }
  }

  async create(input: { name: string; description: string }) {
    try {
      const role = await this.roleRepository.create(input);
      return ok(role);
    } catch {
      return err("INTERNAL", "internal error");
    }
  }

  async findById(id: string) {
    try {
      const role = await this.roleRepository.findById(id);
      if (!role) {
        return err("NOT_FOUND", "Role not founded");
      }
      return ok(role);
    } catch {
      return err("INTERNAL", "internal error");
    }
  }
}
