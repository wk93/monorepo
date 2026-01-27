import type { Result } from "../entities/basic.entity";
import type { PasswordHasher } from "../ports/password-hasher.port";
import type { TokenService } from "../ports/token-service.port";
import type { UserRepository } from "../repositories/user.repository";

export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly hasher: PasswordHasher,
  ) {}

  async login(input: {
    email: string;
    password: string;
  }): Promise<Result<{ accessToken: string }>> {
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
        accessToken,
      },
    };
  }
}
