export class RefreshToken {
  refreshToken: string;
}

export class JwtTokenPayload {
  id: string;
  email: string;
}

export class TokenData {
  payload: JwtTokenPayload;
}

export class GeneratedTokens {
  accessToken: string;
  refreshToken: string;
}
