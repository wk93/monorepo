import { z } from "zod";

import { Email, RequiredString } from "./basic";

export const LoginInputSchema = z.object({
  email: Email,
  password: RequiredString,
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const LoginResponseSchema = z.object({
  accessToken: RequiredString,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
