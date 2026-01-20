import type { LoginInput, LoginResponse } from "@mono/contracts/auth";

import type { Result } from "../entities/basic.entity";
import type { PasswordHasher } from "../ports/password-hasher.port";
import type { TokenService } from "../ports/token-service.port";
import type { UserRepository } from "../repositories/user.repository";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly hasher: PasswordHasher,
  ) {}

  async login(input: LoginInput): Promise<Result<LoginResponse>> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      return {
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Invalid email or password" },
      };
    }

    const ok = await this.hasher.verify({
      password: input.password,
      passwordHash: user.passwordHash,
    });
    if (!ok) {
      return {
        ok: false,
        error: { code: "UNAUTHORIZED", message: "Invalid email or password" },
      };
    }

    const accessToken = await this.tokenService.signAccessToken({
      sub: user.id,
    });

    return {
      ok: true,
      value: {
        user: { id: user.id, email: user.email, name: user.name },
        tokens: { accessToken },
      },
    };
  }
}
