import { TokenRepositoryMock, UpdateResultSuccessMock, UpdateResultUnsuccessMock } from '../../../mock';
import { UserTokenService } from '../../../../modules/user-token';
import { refreshTokenFromDbMock, tokensMock } from '../../auth/mock';
import { userFromDbMock } from '../../auth/mock';
import { logger } from '../../../../config';
describe('UserTokenService', () => {
  const userTokenService = new UserTokenService(TokenRepositoryMock);

  jest.spyOn(logger, 'error');
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserToken', () => {
    it('should update token for user', async () => {
      TokenRepositoryMock.saveEntity.mockImplementation();

      await userTokenService.updateUserToken(tokensMock.refreshToken, userFromDbMock);

      userFromDbMock.refresh_token.refresh_token = tokensMock.refreshToken;

      expect(TokenRepositoryMock.saveEntity).toBeCalledWith(userFromDbMock.refresh_token);
    });
  });

  describe('createTokenForUser', () => {
    it('should create token for user', async () => {
      TokenRepositoryMock.saveEntity.mockImplementation();

      await userTokenService.createToken(tokensMock.refreshToken, userFromDbMock.id);

      expect(TokenRepositoryMock.saveEntity).toBeCalledWith({
        refresh_token: tokensMock.refreshToken,
        user: userFromDbMock.id,
      });
    });
  });

  describe('findToken', () => {
    it('should find token', async () => {
      TokenRepositoryMock.getOneBy.mockResolvedValueOnce(refreshTokenFromDbMock);

      const result = await userTokenService.findRefreshToken(refreshTokenFromDbMock.refresh_token);

      expect(TokenRepositoryMock.getOneBy).toBeCalledWith({ refresh_token: refreshTokenFromDbMock.refresh_token });

      expect(result).toEqual(refreshTokenFromDbMock);
    });
  });

  describe('findTokenByUserId', () => {
    it('should find token by user id', async () => {
      TokenRepositoryMock.getOneBy.mockResolvedValueOnce(refreshTokenFromDbMock);

      const result = await userTokenService.findTokenByUserId(refreshTokenFromDbMock.user);

      expect(TokenRepositoryMock.getOneBy).toBeCalledWith({ user: refreshTokenFromDbMock.user });

      expect(result).toEqual(refreshTokenFromDbMock);
    });
  });

  describe('updateRefreshToken', () => {
    it('should find token by refresh_token and update it', async () => {
      TokenRepositoryMock.updateToken.mockResolvedValueOnce(UpdateResultSuccessMock);

      await userTokenService.updateRefreshToken(refreshTokenFromDbMock.refresh_token, tokensMock.refreshToken);

      expect(TokenRepositoryMock.updateToken).toBeCalledWith(
        refreshTokenFromDbMock.refresh_token,
        tokensMock.refreshToken,
      );
    });

    it('should throw error if token has not bee updated', async () => {
      TokenRepositoryMock.updateToken.mockResolvedValueOnce(UpdateResultUnsuccessMock);

      expect(async () =>
        userTokenService.updateRefreshToken(refreshTokenFromDbMock.refresh_token, tokensMock.refreshToken),
      ).rejects.toThrowError(UserTokenService.errorMessages.canNotUpdateToken);
    });
  });
});
