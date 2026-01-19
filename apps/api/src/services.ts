import { AuthService } from "@mono/core/services/auth.service";
import { UserService } from "@mono/core/services/user.service";
import { DrizzleUserRepository } from "@mono/drizzle";

import { createDb } from "./adapters/db";
import { BunPasswordHasher } from "./adapters/password-hasher";
import { JwtTokenService } from "./adapters/token.service";
import type { Env } from "./env";

export async function buildServices(env: Env) {
  const { db } = createDb(env);

  const userRepository = new DrizzleUserRepository(db);
  const passwordHasher = new BunPasswordHasher();
  const tokenService = new JwtTokenService(env.JWT_SECRET);

  const authService = new AuthService(
    userRepository,
    tokenService,
    passwordHasher,
  );

  await userRepository.init({
    admin: {
      email: env.ADMIN_EMAIL,
      hashedPassword: await passwordHasher.hash({
        password: env.ADMIN_PASSWORD,
      }),
    },
  });

  const userService = new UserService(userRepository);

  return {
    authService,
    userService,
    tokenService,
  };
}

export type Services = Awaited<ReturnType<typeof buildServices>>;
