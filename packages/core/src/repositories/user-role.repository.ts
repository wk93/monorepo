export interface UserRoleRepository {
  getUserRole(data: {
    userId: string;
  }): Promise<{ roleId: string; hasFullAccess: boolean } | null>;
  setUserRole(data: { userId: string; roleId: string }): Promise<void>;
}
