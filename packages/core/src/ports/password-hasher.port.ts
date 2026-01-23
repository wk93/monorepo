export interface PasswordHasher {
  hash({ password }: { password: string }): Promise<string>;
  verify(data: { password: string; passwordHash: string }): Promise<boolean>;
}
