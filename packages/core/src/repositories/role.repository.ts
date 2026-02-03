import type { RoleEntityWithId } from "../entities";

export interface RoleRepository {
  getFlags(data: {
    roleId: string;
  }): Promise<{ hasFullAccess: boolean } | null>;
  list(): Promise<RoleEntityWithId[]>;
  findById(id: string): Promise<RoleEntityWithId | null>;
  create(dto: { name: string; description: string }): Promise<RoleEntityWithId>;
  update(dto: {
    id: string;
    fields: Partial<{ name: string; description: string }>;
  }): Promise<RoleEntityWithId>;
  remove(dto: { id: string }): Promise<void>;
}
