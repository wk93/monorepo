import type { PasswordHasher } from "@mono/core";

export class BunPasswordHasher implements PasswordHasher {
  async hash({ password }: { password: string }): Promise<string> {
    return await Bun.password.hash(password, { algorithm: "bcrypt" });
  }

  async verify({
    passwordHash,
    password,
  }: {
    passwordHash: string;
    password: string;
  }): Promise<boolean> {
    return await Bun.password.verify(password, passwordHash, "bcrypt");
  }
}
