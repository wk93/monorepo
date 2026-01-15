import type { PasswordHasher } from "@mono/core";

export class BunPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return await Bun.password.hash(password, { algorithm: "bcrypt" });
  }

  async verify(hash: string, password: string): Promise<boolean> {
    return await Bun.password.verify(password, hash);
  }
}
