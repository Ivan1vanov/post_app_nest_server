import { AuthUserResponse } from '../../../../modules/auth';
import { tokensMock } from './tokensMock';
import { userFromDbMock } from './userFromDbMock';

export const AuthUserResponseMock: AuthUserResponse = {
  user: userFromDbMock,
  tokens: tokensMock,
};
