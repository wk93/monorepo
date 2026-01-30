import type {
  UserEntity,
  UserEntityWithPassword,
} from "../entities/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntityWithPassword | null>;
  findById(id: string): Promise<UserEntity | null>;

  list(): Promise<UserEntity[]>;
  create(dto: { email: string; passwordHash: string }): Promise<UserEntity>;
}
