import { describe, expect, test } from "bun:test";

import { AppError } from "../src/errors/app-error";
import type { UserRepository } from "../src/repositories/user.repository";
import { UserService } from "../src/services/user.service";

describe("core/UserService.getProfile", () => {
  test("throws NOT_FOUND when user does not exist", async () => {
    const users: UserRepository = {
      async findByEmail() {
        return null;
      },
      async findById() {
        return null;
      },
    };

    const svc = new UserService(users);

    try {
      await svc.getProfile("u_missing");
      throw new Error("expected to throw");
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
      const e = err as AppError;
      expect(e.code).toBe("NOT_FOUND");
      expect(e.status).toBe(404);
    }
  });

  test("returns public user DTO with ISO createdAt", async () => {
    const users: UserRepository = {
      async findByEmail() {
        return null;
      },
      async findById(id: string) {
        if (id !== "u_1") return null;
        return {
          id: "u_1",
          email: "user@example.com",
          name: null,
          passwordHash: "hash",
          createdAt: new Date("2025-01-01T10:00:00.000Z"),
        };
      },
    };

    const svc = new UserService(users);

    const dto = await svc.getProfile("u_1");

    expect(dto).toEqual({
      id: "u_1",
      email: "user@example.com",
      name: null,
      createdAt: "2025-01-01T10:00:00.000Z",
    });
  });
});
