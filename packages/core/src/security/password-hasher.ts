export interface PasswordHasher {
  verify(password: string, passwordHash: string): Promise<boolean>;
}
