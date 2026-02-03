import z from "zod";

import { RequiredString } from "./basic";

export const RolePublicSchema = z.object({
  id: RequiredString,
  name: RequiredString,
  description: RequiredString,
  createdAt: z.iso.datetime(),
});
