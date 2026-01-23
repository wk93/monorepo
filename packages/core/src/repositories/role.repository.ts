export interface RoleRepository {
  getFlags(data: {
    roleId: string;
  }): Promise<{ hasFullAccess: boolean } | null>;
}
