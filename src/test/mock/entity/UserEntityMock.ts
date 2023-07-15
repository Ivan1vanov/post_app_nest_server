import { User } from '../../../entity';
import { Repository } from 'typeorm';

export const UserEntityMock = {
  findOne: jest.fn(),
  save: jest.fn(),
} as unknown as jest.Mocked<Repository<User>>;
