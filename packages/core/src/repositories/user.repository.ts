import type { UserEntity } from "../entities/user.entity";

export interface InitProps {
  admin: { email: string; hashedPassword: string };
}

export interface UserRepository {
  init(data: InitProps): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
