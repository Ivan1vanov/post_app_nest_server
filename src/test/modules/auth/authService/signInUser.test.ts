import * as crypto from 'bcryptjs';
import { AuthService } from '../../../../modules/auth';
import { userRepositoryMock, userTokenServiceMock, userInfoServiceMock, authServiceUtilsMock } from '../../../mock';
import { userFromDbMock, tokensMock, signinUserInputMock } from '../mock';
import { signInErrorDataSet } from '../mock/signInErrorDataSet';

describe('signInUser', () => {
  const authService = new AuthService(
    userRepositoryMock,
    userTokenServiceMock,
    userInfoServiceMock,
    authServiceUtilsMock,
  );

  it('should signin user', async () => {
    userRepositoryMock.getByEmail.mockResolvedValue(userFromDbMock);
    jest.spyOn(crypto, 'compare').mockImplementation(() => true);
    authServiceUtilsMock.generateTokensForUser.mockResolvedValue(tokensMock);
    userTokenServiceMock.updateUserToken.mockResolvedValue();

    const result = await authService.signInUser(signinUserInputMock);

    expect(result).toEqual({
      user: userFromDbMock,
      tokens: tokensMock,
    });
  });

  it.each(signInErrorDataSet)('[$#] should throw error if $message', async ({ findUser, passwordMatch, error }) => {
    userRepositoryMock.getByEmail.mockResolvedValue(findUser);
    jest.spyOn(crypto, 'compare').mockImplementation(() => passwordMatch);

    expect(async () => authService.signInUser(signinUserInputMock)).rejects.toThrow(error);
  });
});
