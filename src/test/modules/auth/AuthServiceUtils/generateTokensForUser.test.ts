import { AuthServiceUtils } from '../../../../modules/auth';
import { jwtServiceMock } from '../../../mock';
import { tokensMock, userFromDbMock } from '../mock';

describe('generateTokensForUser', () => {
  const authServiceUtils = new AuthServiceUtils(jwtServiceMock);

  it('should generate tokens for user', async () => {
    const { accessToken, refreshToken } = tokensMock;

    jwtServiceMock.signAsync.mockResolvedValueOnce(accessToken);
    jwtServiceMock.signAsync.mockResolvedValueOnce(refreshToken);

    const result = await authServiceUtils.generateTokensForUser(userFromDbMock);

    expect(result).toEqual({
      accessToken,
      refreshToken,
    });
  });
});
