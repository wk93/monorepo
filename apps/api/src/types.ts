import type { Services } from "./services";

export interface Variables {
  services: Services;
}

export interface HonoEnv {
  Variables: Variables;
}

export interface AuthVariables extends Variables {
  auth: {
    userId: string;
    roleId: string | null;
  };
}

export interface AuthHonoEnv {
  Variables: AuthVariables;
}
