import { z } from "zod";

import { Email, Password, RequiredString } from "./basic";

export const UserPublicSchema = z.object({
  id: RequiredString,
  email: Email,
  createdAt: z.iso.datetime(),
});

export type UserPublic = z.infer<typeof UserPublicSchema>;

export const CreateUserSchema = z.object({
  email: Email,
  password: Password,
});
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;
