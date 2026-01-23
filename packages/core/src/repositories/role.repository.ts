export interface InitRoles {
  root: {
    name: string;
    description: string | null;
    hasFullAccess: true;
  };
}

export interface RoleRepository {
  init(data: InitRoles): Promise<{ rootRoleId: string }>;
  getFlags(data: {
    roleId: string;
  }): Promise<{ hasFullAccess: boolean } | null>;
}
