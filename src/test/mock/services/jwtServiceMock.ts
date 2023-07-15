import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = {
  signAsync: jest.fn(),
  verify: jest.fn(),
} as unknown as jest.Mocked<JwtService>;
