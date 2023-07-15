import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../../../modules/auth';
import { userRepositoryMock, userTokenServiceMock, userInfoServiceMock, authServiceUtilsMock } from '../../../mock';
import { userFromDbMock, tokensMock, registerUserInputMock } from '../mock';

describe('registerUser', () => {
  const authService = new AuthService(
    userRepositoryMock,
    userTokenServiceMock,
    userInfoServiceMock,
    authServiceUtilsMock,
  );

  it('should create new user', async () => {
    userRepositoryMock.getByEmail.mockResolvedValue(null);
    userRepositoryMock.saveEntity.mockResolvedValue(userFromDbMock);
    authServiceUtilsMock.generateTokensForUser.mockResolvedValue(tokensMock);
    userInfoServiceMock.createInfo.mockResolvedValue();
    userTokenServiceMock.createToken.mockResolvedValue();

    const result = await authService.signUpUser(registerUserInputMock);

    expect(result).toEqual({
      user: userFromDbMock,
      tokens: tokensMock,
    });
  });

  it('should throw error if user exists', () => {
    userRepositoryMock.getByEmail.mockResolvedValue(userFromDbMock);
    expect(async () => authService.signUpUser(registerUserInputMock)).rejects.toThrow(
      new HttpException(AuthService.errorMessages.userAlreadyExists, HttpStatus.BAD_REQUEST),
    );
  });
});
