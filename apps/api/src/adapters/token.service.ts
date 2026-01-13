import { errors as JoseErrors, jwtVerify, SignJWT } from "jose";

import type { AccessTokenPayload, TokenService } from "@mono/core";
import { AppError } from "@mono/core/errors/app-error";

export class JwtTokenService implements TokenService {
  constructor(private readonly secret: string) {}

  private key(): Uint8Array {
    return new TextEncoder().encode(this.secret);
  }

  async signAccessToken({ sub }: AccessTokenPayload): Promise<string> {
    return await new SignJWT({ sub })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(sub)
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(this.key());
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      const { payload } = await jwtVerify(token, this.key(), {
        algorithms: ["HS256"],
      });

      const sub = payload.sub;
      if (typeof sub !== "string" || sub.length === 0) {
        throw new JoseErrors.JWTInvalid("missing sub");
      }

      return { sub };
    } catch (e) {
      if (
        e instanceof JoseErrors.JWTExpired ||
        e instanceof JoseErrors.JWTInvalid ||
        e instanceof JoseErrors.JWTClaimValidationFailed ||
        e instanceof JoseErrors.JWSSignatureVerificationFailed ||
        e instanceof JoseErrors.JWSInvalid
      ) {
        throw new AppError("UNAUTHORIZED", "Invalid token");
      }

      throw e;
    }
  }
}
