import type { AppError } from "../errors/app-error";

export interface Ok<T> {
  ok: true;
  value: T;
}
export interface Err {
  ok: false;
  error: AppError;
}
export type Result<T> = Ok<T> | Err;
