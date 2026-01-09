import { z } from "zod";

export const UserPublicSchema = z.object({
  id: z.string().min(1),
  email: z.email(),
  name: z.string().min(1).nullable(),
  createdAt: z.iso.datetime(),
});

export type UserPublic = z.infer<typeof UserPublicSchema>;
