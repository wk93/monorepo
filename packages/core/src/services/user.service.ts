import type { UserPublic } from "@mono/contracts/user";

import type { Result } from "../entities/basic.entity";
import type { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(userId: string): Promise<Result<UserPublic>> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return {
        ok: false,
        error: { code: "NOT_FOUND", message: "User not found" },
      };
    }

    return {
      ok: true,
      value: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
      },
    };
  }
}
