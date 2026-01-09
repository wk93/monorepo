import { describe, expect, test } from "bun:test";
import { z } from "zod";

import { LoginInputSchema, LoginResponseSchema } from "../src/auth";
import { LoginInputSchema as LoginInputSchemaFromIndex } from "../src/index";

describe("contracts/auth", () => {
  test("LoginInputSchema: accepts valid payload", () => {
    const input = {
      email: "user@example.com",
      password: "supersecret123",
    };

    expect(LoginInputSchema.parse(input)).toEqual(input);
  });

  test("LoginInputSchema: rejects invalid email", () => {
    expect(() =>
      LoginInputSchema.parse({
        email: "not-an-email",
        password: "supersecret123",
      }),
    ).toThrow(z.ZodError);
  });

  test("LoginResponseSchema: accepts valid response", () => {
    const out = {
      user: { id: "u_1", email: "user@example.com", name: "Wojtek" },
      tokens: { accessToken: "token" },
    };

    expect(LoginResponseSchema.parse(out)).toEqual(out);
  });

  test("LoginResponseSchema: rejects missing token", () => {
    expect(() =>
      LoginResponseSchema.parse({
        user: { id: "u_1", email: "user@example.com", name: null },
        tokens: {},
      }),
    ).toThrow(z.ZodError);
  });

  test("index.ts re-exports auth schemas", () => {
    expect(LoginInputSchemaFromIndex).toBe(LoginInputSchema);
  });
});
