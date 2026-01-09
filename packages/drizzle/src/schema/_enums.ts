import { pgEnum } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", ["admin", "user"]);
export type UserType = (typeof userTypeEnum.enumValues)[number];
