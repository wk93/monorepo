import type { UserEntity } from "../entities/user.entity";

export interface InitProps {
  admin: { email: string; passwordHash: string };
}

export interface UserRepository {
  init(data: InitProps): Promise<{ adminId: string }>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
