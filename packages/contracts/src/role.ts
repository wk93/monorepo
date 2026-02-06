import z from "zod";

import { RequiredString } from "./basic";

export const RolePublicSchema = z.object({
  id: RequiredString,
  name: RequiredString,
  description: RequiredString,
});
export type RolePublicSchema = z.infer<typeof RolePublicSchema>;

export const CreateRoleSchema = z.object({
  name: RequiredString,
  description: RequiredString,
});
export type CreateRoleSchema = z.infer<typeof CreateRoleSchema>;

export const PermissionItemSchema = z.object({
  key: RequiredString,
  label: RequiredString,
  description: z.string().nullable(),
});
export type PermissionItemSchema = z.infer<typeof PermissionItemSchema>;

export const PermissionCategorySchema = z.object({
  name: RequiredString,
  items: z.array(PermissionItemSchema),
});
