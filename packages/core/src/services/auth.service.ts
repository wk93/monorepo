import type { LoginInput, LoginResponse } from "@mono/contracts/auth";

import { AppError } from "../errors/app-error";
import type { UserRepository } from "../repositories/user.repository";
import type { PasswordHasher } from "../security/password-hasher";
import type { TokenService } from "../security/token.service";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly hasher: PasswordHasher,
  ) {}

  async login(input: LoginInput): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new AppError("UNAUTHORIZED", "Invalid email or password");

    const ok = await this.hasher.verify(input.password, user.passwordHash);
    if (!ok) throw new AppError("UNAUTHORIZED", "Invalid email or password");

    const accessToken = await this.tokenService.signAccessToken({
      sub: user.id,
    });

    return {
      user: { id: user.id, email: user.email, name: user.name },
      tokens: { accessToken },
    };
  }
}
