import { AuthService } from '../../../modules/auth';

export const AuthServiceMock = {
  signInUser: jest.fn(),
  signUpUser: jest.fn(),
  refreshToken: jest.fn(),
} as unknown as jest.Mocked<AuthService>;
