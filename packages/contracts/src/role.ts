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
