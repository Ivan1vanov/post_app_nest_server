import { AuthController } from '../../../../modules/auth';
import { AuthServiceMock, requestMock, responseMock } from '../../../mock';
import { AuthUserResponseMock, userSignUpRequestMock, userSignInRequestMock, tokensMock } from '../mock';
describe('AuthController', () => {
  const authController = new AuthController(AuthServiceMock);

  describe('signUpUser', () => {
    it('should sign up user', async () => {
      AuthServiceMock.signUpUser.mockResolvedValueOnce(AuthUserResponseMock);

      const result = await authController.signUpUser(userSignUpRequestMock, responseMock);

      expect(result).toEqual(AuthUserResponseMock);
    });
  });

  describe('signInUser', () => {
    it('should sign in user', async () => {
      AuthServiceMock.signInUser.mockResolvedValueOnce(AuthUserResponseMock);

      const result = await authController.signInUser(userSignInRequestMock, responseMock);

      expect(result).toEqual(AuthUserResponseMock);
    });
  });

  describe('refreshToken', () => {
    it('should update and return new tokens', async () => {
      AuthServiceMock.refreshToken.mockResolvedValueOnce(tokensMock);
      requestMock.cookies.refreshToken = tokensMock.refreshToken;

      const result = await authController.getNewTokens(requestMock, responseMock);

      expect(result).toEqual(tokensMock);
    });
  });
});
