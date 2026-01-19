export interface PasswordHasher {
  verify(data: { password: string; passwordHash: string }): Promise<boolean>;
}
