import { describe, expect, test } from "bun:test";
import { z } from "zod";

import { UserPublicSchema as UserPublicSchemaFromIndex } from "../src/index";
import { UserPublicSchema } from "../src/user";

describe("contracts/user", () => {
  test("UserPublicSchema: accepts valid payload", () => {
    const out = {
      id: "u_1",
      email: "user@example.com",
      name: null,
      createdAt: "2025-01-01T10:00:00.000Z",
    };

    expect(UserPublicSchema.parse(out)).toEqual(out);
  });

  test("UserPublicSchema: rejects invalid email", () => {
    expect(() =>
      UserPublicSchema.parse({
        id: "u_1",
        email: "nope",
        name: "X",
        createdAt: "2025-01-01T10:00:00.000Z",
      }),
    ).toThrow(z.ZodError);
  });

  test("UserPublicSchema: rejects non-ISO datetime", () => {
    expect(() =>
      UserPublicSchema.parse({
        id: "u_1",
        email: "user@example.com",
        name: "X",
        createdAt: "2025-01-01", // nie datetime
      }),
    ).toThrow(z.ZodError);
  });

  test("index.ts re-exports UserPublicSchema", () => {
    expect(UserPublicSchemaFromIndex).toBe(UserPublicSchema);
  });
});
