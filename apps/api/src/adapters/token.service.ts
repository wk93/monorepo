import { errors as JoseErrors, jwtVerify, SignJWT } from "jose";

import type { AccessTokenPayload, TokenService } from "@mono/core";

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
    const { payload } = await jwtVerify(token, this.key(), {
      algorithms: ["HS256"],
    });

    const sub = payload.sub;
    if (typeof sub !== "string" || sub.length === 0) {
      throw new JoseErrors.JWTInvalid("missing sub");
    }

    return { sub };
  }
}
