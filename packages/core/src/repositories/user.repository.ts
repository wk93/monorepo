import type {
  UserEntity,
  UserEntityWithPassword,
} from "../entities/user.entity";

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntityWithPassword | null>;
  findById(id: string): Promise<UserEntity | null>;

  create(dto: { email: string; passwordHash: string }): Promise<UserEntity>;
}
