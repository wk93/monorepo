import type { RoleRepository } from "../repositories";
import { err, ok } from "../shared";

export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async list() {
    try {
      const roles = await this.roleRepository.list();
      return ok(roles);
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
