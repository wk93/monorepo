import type { RoleEntity } from "../entities/role.entity";
import type { Crud } from "./crud.repository";

export type RoleRepository = Crud<RoleEntity>;
