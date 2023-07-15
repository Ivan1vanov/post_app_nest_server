import { JwtService } from '@nestjs/jwt';
import { AuthServiceUtils } from '../../../../modules/auth';

describe('AuthServiceUtils', () => {
  const authServiceUtils = new AuthServiceUtils();

  it('jwtServiceMock should be instance of JwtService', () => {
    expect(authServiceUtils.jwtService).toBeInstanceOf(JwtService);
  });
});
