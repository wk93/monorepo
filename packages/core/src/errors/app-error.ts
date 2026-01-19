import type { ContentfulStatusCode } from "hono/utils/http-status";

export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL";

export class AppError {
  readonly code: AppErrorCode;
  readonly status: ContentfulStatusCode;
  readonly details?: unknown;
  readonly message: string;

  constructor(
    code: AppErrorCode,
    message: string,
    opts?: { status?: ContentfulStatusCode; details?: unknown },
  ) {
    this.code = code;
    this.message = message;
    this.status = opts?.status ?? mapCodeToStatus(code);
    this.details = opts?.details;
  }
}

function mapCodeToStatus(code: AppErrorCode): ContentfulStatusCode {
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
    default:
      return 500;
  }
}
