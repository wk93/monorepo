import type { PasswordHasher } from "../ports/password-hasher.port";
import type { TokenService } from "../ports/token-service.port";
import type { UserRepository } from "../repositories/user.repository";
import { err, ok, type Result } from "../shared";

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
      return err("UNAUTHORIZED", "Invalid email or password");
    }

    const result = await this.hasher.verify({
      password: input.password,
      passwordHash: user.passwordHash,
    });
    if (!result) {
      return err("UNAUTHORIZED", "Invalid email or password");
    }

    const accessToken = await this.tokenService.signAccessToken({
      sub: user.id,
    });

    return ok({ accessToken });
  }
}
