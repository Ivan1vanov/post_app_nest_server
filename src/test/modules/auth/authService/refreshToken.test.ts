import { AuthService } from '../../../../modules/auth';
import { userRepositoryMock, userTokenServiceMock, userInfoServiceMock, authServiceUtilsMock } from '../../../mock';
import { tokenDataMock, userFromDbMock, tokensMock } from '../mock';

describe('refreshToken', () => {
  const authService = new AuthService(
    userRepositoryMock,
    userTokenServiceMock,
    userInfoServiceMock,
    authServiceUtilsMock,
  );

  it('should refresh token and update it in db', async () => {
    authServiceUtilsMock.verifyToken.mockResolvedValue(tokenDataMock);
    userRepositoryMock.getById.mockResolvedValue(userFromDbMock);
    authServiceUtilsMock.generateTokensForUser.mockResolvedValue(tokensMock);
    userTokenServiceMock.createToken.mockResolvedValue();

    const result = await authService.refreshToken('some_token');

    expect(result).toEqual(tokensMock);
  });
});
