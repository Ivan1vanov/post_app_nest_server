import { TokenRepository } from '../../../repositories';

export const TokenRepositoryMock = {
  saveEntity: jest.fn(),
  getOneBy: jest.fn(),
  findRefreshToken: jest.fn(),
  updateToken: jest.fn(),
} as unknown as jest.Mocked<TokenRepository>;
