import { UserRepository } from '../../repositories';
import { UserEntityMock } from '../mock/entity/UserEntityMock';
import { userFromDbMock } from '../modules/auth/mock';

describe('UserRepository', () => {
  const userRepository = new UserRepository(UserEntityMock);

  describe('getByEmail', () => {
    it('should get user by ptovided email address', async () => {
      UserEntityMock.findOne.mockResolvedValueOnce(userFromDbMock);

      const result = await userRepository.getByEmail(userFromDbMock.email);

      expect(result).toEqual(userFromDbMock);
    });
  });
});
