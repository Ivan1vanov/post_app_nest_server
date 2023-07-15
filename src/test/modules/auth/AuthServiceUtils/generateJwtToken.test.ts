import { AuthServiceUtils } from '../../../../modules/auth';
import { jwtServiceMock } from '../../../mock';
import { tokenPayloadMock } from '../mock';

describe('generateJwtToken', () => {
  const authServiceUtils = new AuthServiceUtils(jwtServiceMock);

  it('should generate token', async () => {
    const expectedToken = 'some_token';

    jwtServiceMock.signAsync.mockResolvedValue('some_token');
    const result = await authServiceUtils.generateJwtToken(tokenPayloadMock, 'key', '24h');

    expect(result).toEqual(expectedToken);
  });
});
