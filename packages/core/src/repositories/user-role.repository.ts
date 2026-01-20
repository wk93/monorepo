export interface UserRoleRepository {
  getUserRoleId(data: { userId: string }): Promise<string | null>;
  setUserRole(data: { userId: string; roleId: string }): Promise<void>;
}
