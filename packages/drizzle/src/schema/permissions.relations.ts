import { relations } from "drizzle-orm";

import {
  permissionKeys,
  rolePermissions,
  roles,
  userRoles,
} from "./permissions";
import { usersTable } from "./users";

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
  user: one(usersTable, {
    fields: [userRoles.userId],
    references: [usersTable.id],
  }),
}));

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissionKeys, {
      fields: [rolePermissions.permissionKey],
      references: [permissionKeys.key],
    }),
  }),
);

export const permissionKeysRelations = relations(
  permissionKeys,
  ({ many }) => ({
    rolePermissions: many(rolePermissions),
  }),
);

export const usersRelations = relations(usersTable, ({ one }) => ({
  userRole: one(userRoles, {
    fields: [usersTable.id],
    references: [userRoles.userId],
  }),
}));
