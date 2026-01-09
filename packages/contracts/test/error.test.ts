import { describe, expect, test } from "bun:test";
import { z } from "zod";

import { ErrorEnvelopeSchema } from "../src/error";
import { ErrorEnvelopeSchema as ErrorEnvelopeSchemaFromIndex } from "../src/index";

describe("contracts/error", () => {
  test("ErrorEnvelopeSchema: accepts minimal payload", () => {
    const payload = {
      error: {
        code: "ANY_CODE",
        message: "Something happened",
      },
    };

    expect(ErrorEnvelopeSchema.parse(payload)).toEqual(payload);
  });

  test("ErrorEnvelopeSchema: accepts payload with details of any type", () => {
    const payload = {
      error: {
        code: "VALIDATION_ERROR",
        message: "Bad input",
        details: { field: "email", reason: "invalid" },
      },
    };

    expect(ErrorEnvelopeSchema.parse(payload)).toEqual(payload);
  });

  test("ErrorEnvelopeSchema: rejects missing error object", () => {
    expect(() => ErrorEnvelopeSchema.parse({})).toThrow(z.ZodError);
  });

  test("ErrorEnvelopeSchema: rejects missing code", () => {
    expect(() =>
      ErrorEnvelopeSchema.parse({
        error: { message: "x" },
      }),
    ).toThrow(z.ZodError);
  });

  test("index.ts re-exports ErrorEnvelopeSchema", () => {
    expect(ErrorEnvelopeSchemaFromIndex).toBe(ErrorEnvelopeSchema);
  });
});
