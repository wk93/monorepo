import { z } from "zod";

export const LoginInputSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const LoginResponseSchema = z.object({
  accessToken: z.string().min(1),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
