import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthServiceUtils } from '../../../../modules/auth';
import { jwtServiceMock } from '../../../mock';
import { tokenDataMock } from '../mock';

describe('verifyToken', () => {
  const authServiceUtils = new AuthServiceUtils(jwtServiceMock);

  it('should verify token and return token data', async () => {
    jwtServiceMock.verify.mockImplementation(() => tokenDataMock);

    const result = await authServiceUtils.verifyToken('valid_token');

    expect(result).toEqual(tokenDataMock);
  });

  it('should throw exception if token is invalid', async () => {
    const ERROR_MESSAGE_MOCK = 'some error during token decoding';

    jwtServiceMock.verify = jest.fn().mockRejectedValue(ERROR_MESSAGE_MOCK);

    expect(async () => authServiceUtils.verifyToken('no_valid_token')).rejects.toThrow(
      new HttpException('', HttpStatus.UNAUTHORIZED),
    );
  });
});
