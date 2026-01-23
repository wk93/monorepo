import type { ContentfulStatusCode } from "hono/utils/http-status";

import type { Context } from "hono";

import type { AppError, AppErrorCode, Err } from "@mono/core";

type ThrownAppError = AppError & { status?: number };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isAppErrorCode(code: unknown): code is AppErrorCode {
  return (
    code === "VALIDATION_ERROR" ||
    code === "UNAUTHORIZED" ||
    code === "NOT_FOUND" ||
    code === "CONFLICT" ||
    code === "INTERNAL"
  );
}

function isAppError(err: unknown): err is ThrownAppError {
  if (!isObject(err)) return false;

  const code = err["code"];
  const message = err["message"];

  return isAppErrorCode(code) && typeof message === "string";
}

function statusFromCode(code: AppErrorCode): number {
  switch (code) {
    case "VALIDATION_ERROR":
      return 400;
    case "UNAUTHORIZED":
      return 401;
    case "NOT_FOUND":
      return 404;
    case "CONFLICT":
      return 409;
    case "INTERNAL":
      return 500;
  }
}

export function handleError(err: unknown, c: Context) {
  if (isAppError(err)) {
    const status =
      typeof err.status === "number" && err.status >= 400 && err.status <= 599
        ? err.status
        : statusFromCode(err.code);

    const payload: Err = {
      ok: false,
      error: {
        code: err.code,
        message: err.message,
      },
    };

    return c.json(payload, status as ContentfulStatusCode);
  }

  const payload: Err = {
    ok: false,
    error: {
      code: "INTERNAL",
      message: "Internal error",
    },
  };

  return c.json(payload, 500);
}
