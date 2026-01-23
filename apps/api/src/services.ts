import { AuthService } from "@mono/core/services/auth.service";
import { AuthorizationService } from "@mono/core/services/authorization.service";
import { UserService } from "@mono/core/services/user.service";
import {
  DrizzlePermissionCatalogRepository,
  DrizzleRolePermissionRepository,
  DrizzleRoleRepository,
  DrizzleUserRepository,
  DrizzleUserRoleRepository,
} from "@mono/drizzle";

import { createDb } from "./adapters/db";
import { BunPasswordHasher } from "./adapters/password-hasher";
import { JwtTokenService } from "./adapters/token.service";
import type { Env } from "./env";

export async function buildServices(env: Env) {
  const { db } = createDb(env);

  // repos
  const userRepository = new DrizzleUserRepository(db);
  const roleRepository = new DrizzleRoleRepository(db);
  const userRoleRepository = new DrizzleUserRoleRepository(db);
  const rolePermissionRepository = new DrizzleRolePermissionRepository(db);
  const permissionCatalogRepository = new DrizzlePermissionCatalogRepository(
    db,
  );

  // ports/adapters
  const passwordHasher = new BunPasswordHasher();
  const tokenService = new JwtTokenService(env.JWT_SECRET);

  // services
  const authService = new AuthService(
    userRepository,
    tokenService,
    passwordHasher,
  );
  const authorizationService = new AuthorizationService(
    userRoleRepository,
    rolePermissionRepository,
  );

  // seed admin
  const { adminId } = await userRepository.init({
    admin: {
      email: env.ADMIN_EMAIL,
      passwordHash: await passwordHasher.hash({
        password: env.ADMIN_PASSWORD,
      }),
    },
  });

  // init root role
  const { rootRoleId } = await roleRepository.init({
    root: {
      name: "Root",
      description: "System root role",
      hasFullAccess: true,
    },
  });

  // assign admin to root role
  await userRoleRepository.setUserRole({ userId: adminId, roleId: rootRoleId });

  // seed/sync permission keys
  await permissionCatalogRepository.init({
    permissions: [
      {
        key: "users.read",
        category: "Users",
        label: "Read users",
        description: null,
      },
      // ...
    ],
  });

  const userService = new UserService(userRepository);

  return {
    authService,
    authorizationService,
    userService,
    tokenService,
  };
}

export type Services = Awaited<ReturnType<typeof buildServices>>;
