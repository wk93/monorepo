export interface AccessTokenPayload {
  sub: string;
}

export interface TokenService {
  signAccessToken(payload: AccessTokenPayload): Promise<string>;
  verifyAccessToken(token: string): Promise<AccessTokenPayload>;
}
