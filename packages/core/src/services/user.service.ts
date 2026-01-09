import type { UserPublic } from "@mono/contracts/user";

import { AppError } from "../errors/app-error";
import type { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(userId: string): Promise<UserPublic> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError("NOT_FOUND", "User not found");

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
