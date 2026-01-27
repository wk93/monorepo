import { AuthenticationService } from "@mono/core";
import { AuthorizationService } from "@mono/core/services/authorization.service";
import { UserService } from "@mono/core/services/user.service";
import {
  DrizzleRolePermissionRepository,
  DrizzleUserRepository,
  DrizzleUserRoleRepository,
} from "@mono/drizzle";

import { createDb } from "./adapters/db";
import { BunPasswordHasher } from "./adapters/password-hasher";
import { JwtTokenService } from "./adapters/token.service";
import type { Env } from "./env";

export function buildServices(env: Env) {
  const { db } = createDb(env);

  // repos
  const userRepository = new DrizzleUserRepository(db);
  const userRoleRepository = new DrizzleUserRoleRepository(db);
  const rolePermissionRepository = new DrizzleRolePermissionRepository(db);

  // ports/adapters
  const passwordHasher = new BunPasswordHasher();
  const tokenService = new JwtTokenService(env.JWT_SECRET);

  // services
  const authenticationService = new AuthenticationService(
    userRepository,
    tokenService,
    passwordHasher,
  );
  const authorizationService = new AuthorizationService(
    userRoleRepository,
    rolePermissionRepository,
  );

  const userService = new UserService(userRepository, passwordHasher);

  return {
    db,
    authenticationService,
    authorizationService,
    userService,
    tokenService,
  };
}

export type Services = Awaited<ReturnType<typeof buildServices>>;
