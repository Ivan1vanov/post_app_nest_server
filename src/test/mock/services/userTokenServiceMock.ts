import { UserTokenService } from '../../../modules/user-token/user-token.service';

export const userTokenServiceMock = {
  createToken: jest.fn(),
  updateUserToken: jest.fn(),
  updateRefreshToken: jest.fn(),
} as unknown as jest.Mocked<UserTokenService>;
