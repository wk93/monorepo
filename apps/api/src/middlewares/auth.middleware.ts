import { createMiddleware } from "hono/factory";

import type { AuthHonoEnv } from "../types";

export const authMiddleware = createMiddleware<AuthHonoEnv>(async (c, next) => {
  const { tokenService, authorizationService } = c.get("services");

  const header = c.req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token)
    return c.json({ code: "UNAUTHORIZED", message: "Missing token" }, 401);

  let payload: { sub: string };
  try {
    payload = await tokenService.verifyAccessToken(token);
  } catch {
    return c.json({ code: "UNAUTHORIZED", message: "Invalid token" }, 401);
  }

  const userId = payload.sub;
  const role = await authorizationService.getUserRole({ userId });

  c.set("auth", {
    userId,
    roleId: role?.roleId ?? null,
    hasFullAccess: role?.hasFullAccess ?? false,
  });
  await next();
  return;
});
