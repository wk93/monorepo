import { hc } from "hono/client";

import type { AppType } from "@mono/api";

import { useAuthStore } from "@/store/auth.store";

export interface AppError {
  code: string;
  message: string;
}

export class HttpError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(input: { code: string; message: string; status: number }) {
    super(input.message);
    this.name = "HttpError";
    this.code = input.code;
    this.status = input.status;
  }
}

interface ResponseLike {
  json: () => Promise<unknown>;
}

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    "code" in value &&
    typeof (value as Record<string, unknown>)["message"] === "string" &&
    typeof (value as Record<string, unknown>)["code"] === "string"
  );
}

export async function readAppError(res: ResponseLike): Promise<AppError> {
  let raw: unknown;
  try {
    raw = await res.json();
  } catch {
    return { code: "INTERNAL", message: "Nieoczekiwany błąd" };
  }

  return isAppError(raw)
    ? raw
    : { code: "INTERNAL", message: "Nieoczekiwany błąd" };
}

interface ClientResponseLike {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}

type OkResponse<R> = Extract<R, { ok: true }>;

type OkJson<R> =
  OkResponse<R> extends { json: () => Promise<infer T> } ? T : never;

export async function unwrapJson<R extends ClientResponseLike>(
  responsePromise: Promise<R>,
): Promise<OkJson<R>> {
  const res = await responsePromise;

  if (!res.ok) {
    const err = await readAppError(res);
    throw new HttpError({ ...err, status: res.status });
  }

  return (await res.json()) as OkJson<R>;
}

const client = hc<AppType>("/api", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    const token = useAuthStore.getState().token;
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(input, { ...init, headers });
  },
});

export default client;
