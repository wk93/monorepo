import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  ROOT_EMAIL: z.string().min(1),
  ROOT_PASSWORD: z.string().min(1),
});

export type Env = z.infer<typeof EnvSchema>;

export function readEnv(raw: Record<string, unknown>): Env {
  return EnvSchema.parse(raw);
}
