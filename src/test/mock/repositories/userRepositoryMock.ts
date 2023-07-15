import { UserRepository } from '../../../repositories';

export const userRepositoryMock = {
  getById: jest.fn(),
  saveEntity: jest.fn(),
  getOneBy: jest.fn(),
  getByEmail: jest.fn(),
} as unknown as jest.Mocked<UserRepository>;
