import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";

export type PgClient = Sql;
export type PgDb = PostgresJsDatabase;

export interface PgConn {
  db: PgDb;
  client: PgClient;
}

export function createPgDb(connectionString: string): PgConn {
  const client: Sql = postgres(connectionString, {
    max: 10,
    idle_timeout: 30,
    connect_timeout: 10,
  });

  const db: PostgresJsDatabase = drizzle(client);

  return { db, client };
}
