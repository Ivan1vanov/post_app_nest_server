import { BaseRepository } from '../../repositories';
import { UserEntityMock } from '../mock/entity/UserEntityMock';
import { userFromDbMock } from '../modules/auth/mock';

describe('BaseRepository', () => {
  const baseRepository = new BaseRepository(UserEntityMock);

  describe('getById', () => {
    it('should find entity by id and return result', async () => {
      UserEntityMock.findOne.mockResolvedValueOnce(userFromDbMock);

      const result = await baseRepository.getById(userFromDbMock.id);

      expect(UserEntityMock.findOne).toBeCalledWith({
        relations: [],
        where: {
          id: userFromDbMock.id,
        },
      });
      expect(result).toEqual(userFromDbMock);
    });
  });

  describe('getBy', () => {
    it('should find entity by provided params and return result', async () => {
      UserEntityMock.findOne.mockResolvedValueOnce(userFromDbMock);

      const paramsMock = {
        id: userFromDbMock.id,
        email: userFromDbMock.email,
      };

      const result = await baseRepository.getOneBy(paramsMock);

      expect(UserEntityMock.findOne).toBeCalledWith({
        relations: [],
        where: paramsMock,
      });
      expect(result).toEqual(userFromDbMock);
    });
  });

  describe('saveEntity', () => {
    it('should save entity', async () => {
      UserEntityMock.save.mockResolvedValueOnce(userFromDbMock);

      const result = await baseRepository.saveEntity(userFromDbMock);

      expect(UserEntityMock.save).toBeCalledWith(userFromDbMock);
      expect(result).toEqual(userFromDbMock);
    });
  });
});
