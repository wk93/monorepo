import {
  boolean,
  index,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const permissionScopeEnum = pgEnum("permission_scope", ["own", "all"]);
export type PermissionScope = (typeof permissionScopeEnum.enumValues)[number];

export const permissionKeys = pgTable("permission_keys", {
  key: varchar("key", { length: 128 }).primaryKey(),
  category: varchar("category", { length: 128 }).notNull(),
  label: varchar("label", { length: 128 }).notNull(),
  description: text("description"),
});

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  // tenantId: uuid("tenant_id"), uncomment for multi-tenant
  name: varchar("name", { length: 64 }).notNull(),
  description: text("description"),
  isSystem: boolean("is_system").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),

    permissionKey: varchar("permission_key", { length: 128 })
      .notNull()
      .references(() => permissionKeys.key, { onDelete: "restrict" }),

    scope: permissionScopeEnum("scope").notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.roleId, t.permissionKey] }),
    index("role_permissions_role_id_idx").on(t.roleId),
  ],
);

export const userRoles = pgTable(
  "user_roles",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),

    // tenantId: uuid("tenant_id").notNull(), uncomment for multi-tenant
    roleId: uuid("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (t) => [
    primaryKey({
      columns: [
        t.userId,
        // t.tenantId, uncomment for multi-tenant
        t.roleId,
      ],
    }),
    // index("user_roles_user_tenant_idx").on(t.userId, t.tenantId), uncomment for multi-tenant
  ],
);
