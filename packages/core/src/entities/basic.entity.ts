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
