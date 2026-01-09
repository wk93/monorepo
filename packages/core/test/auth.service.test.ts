import { describe, expect, test } from "bun:test";

import { AppError } from "../src/errors/app-error";
import type { UserRepository } from "../src/repositories/user.repository";
import type { PasswordHasher } from "../src/security/password-hasher";
import type { TokenService } from "../src/security/token.service";
import { AuthService } from "../src/services/auth.service";

function makeDeps(
  overrides?: Partial<{
    userByEmail: any | null;
    verifyOk: boolean;
    token: string;
  }>,
) {
  const userByEmail = overrides?.userByEmail ?? {
    id: "u_1",
    email: "user@example.com",
    name: "Wojtek",
    passwordHash: "hash",
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
  };

  const verifyOk = overrides?.verifyOk ?? true;
  const token = overrides?.token ?? "token_123";

  const users: UserRepository = {
    async findByEmail(email: string) {
      return email === userByEmail?.email ? userByEmail : null;
    },
    async findById() {
      return null;
    },
  };

  const tokens: TokenService = {
    async signAccessToken(payload) {
      if (!payload?.sub) throw new Error("missing sub");
      return token;
    },
    async verifyAccessToken() {
      return { sub: "u_1" };
    },
  };

  const hasher: PasswordHasher = {
    async verify(_password: string, passwordHash: string) {
      if (!passwordHash) throw new Error("missing hash");
      return verifyOk;
    },
  };

  return { users, tokens, hasher };
}

describe("core/AuthService.login", () => {
  test("throws UNAUTHORIZED when user does not exist", async () => {
    const { users, tokens, hasher } = makeDeps({ userByEmail: null });
    const svc = new AuthService(users, tokens, hasher);

    try {
      await svc.login({
        email: "nope@example.com",
        password: "supersecret123",
      });
      throw new Error("expected to throw");
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      const e = err as AppError;
      expect(e.code).toBe("UNAUTHORIZED");
      expect(e.status).toBe(401);
    }
  });

  test("throws UNAUTHORIZED when password is invalid", async () => {
    const { users, tokens, hasher } = makeDeps({ verifyOk: false });
    const svc = new AuthService(users, tokens, hasher);

    try {
      await svc.login({ email: "user@example.com", password: "wrongpass123" });
      throw new Error("expected to throw");
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      const e = err as AppError;
      expect(e.code).toBe("UNAUTHORIZED");
      expect(e.status).toBe(401);
    }
  });

  test("returns LoginResponse when credentials are valid", async () => {
    const { users, tokens, hasher } = makeDeps({ token: "abc" });
    const svc = new AuthService(users, tokens, hasher);

    const res = await svc.login({
      email: "user@example.com",
      password: "supersecret123",
    });

    expect(res).toEqual({
      user: { id: "u_1", email: "user@example.com", name: "Wojtek" },
      tokens: { accessToken: "abc" },
    });
  });
});
