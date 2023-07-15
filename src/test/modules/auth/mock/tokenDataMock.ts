import { JwtTokenPayload, TokenData } from '../../../../modules/auth';

export const tokenPayloadMock: JwtTokenPayload = {
  id: '123',
  email: 'some@user.com',
};

export const tokenDataMock: TokenData = {
  payload: tokenPayloadMock,
};
