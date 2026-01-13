import type { Container } from "./container";

export interface Variables {
  container: Container;
}

export interface HonoEnv {
  Variables: Variables;
}

export interface AuthVariables extends Variables {
  auth: { sub: string };
}

export interface AuthHonoEnv {
  Variables: AuthVariables;
}
