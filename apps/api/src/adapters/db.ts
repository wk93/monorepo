import { createPgDb } from "@mono/drizzle";

export function createDb(env: { DATABASE_URL: string }) {
  return createPgDb(env.DATABASE_URL);
}
