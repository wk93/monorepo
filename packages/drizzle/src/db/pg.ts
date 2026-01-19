import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";

import * as schema from "..";

export type PgClient = Sql;
export type Schema = typeof schema;
export type PgDb = PostgresJsDatabase<Schema>;

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

  const db: PostgresJsDatabase<Schema> = drizzle({ client, schema });

  return { db, client };
}
