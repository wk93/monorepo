import type { UserEntity } from "../entities";
import type { PasswordHasher } from "../ports";
import type { UserRepository } from "../repositories/user.repository";
import { err, ok, type Result } from "../shared";

export interface GetProfileResponse {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: PasswordHasher,
  ) {}

  async create(input: {
    email: string;
    password: string;
  }): Promise<Result<UserEntity>> {
    try {
      const existing = await this.userRepository.findByEmail(input.email);
      if (existing) return err("CONFLICT", "Email already in use");

      const passwordHash = await this.hasher.hash({ password: input.password });

      const user = await this.userRepository.create({
        email: input.email,
        passwordHash,
      });

      return ok(user);
    } catch {
      return err("INTERNAL", "Database error");
    }
  }

  async getProfile(userId: string): Promise<Result<GetProfileResponse>> {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        return err("NOT_FOUND", "User not found");
      }

      return ok({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
      });
    } catch {
      return err("INTERNAL", "Database error");
    }
  }
}
