export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL";

export interface AppError {
  code: AppErrorCode;
  message: string;
}

export interface Ok<T> {
  ok: true;
  value: T;
}
export interface Err {
  ok: false;
  error: AppError;
}
export type Result<T> = Ok<T> | Err;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = (code: AppErrorCode, message: string): Err => ({
  ok: false,
  error: { code, message },
});
