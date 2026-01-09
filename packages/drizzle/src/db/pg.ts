import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function createPgDb(connectionString: string): {
  db: PostgresJsDatabase;
  client: ReturnType<typeof postgres>;
} {
  const client = postgres(connectionString, {
    max: 10,
    idle_timeout: 30,
    connect_timeout: 10,
  });

  const db = drizzle(client);
  return { db, client };
}
