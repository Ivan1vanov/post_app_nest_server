import { AuthServiceUtils } from '../../../modules/auth';
export const authServiceUtilsMock = {
  generateTokensForUser: jest.fn(),
  verifyToken: jest.fn(),
} as unknown as jest.Mocked<AuthServiceUtils>;
