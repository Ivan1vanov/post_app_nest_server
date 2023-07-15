import { Token, User, UserInfo } from '../../../../entity';

export const userInfoFromDbMock = {
  id: '1234',
  first_name: 'Some',
  last_name: 'User',
} as UserInfo;

export const refreshTokenFromDbMock = {
  id: '1',
  refresh_token: 'header.payload.signature',
  user: '123456',
} as Token;

export const userFromDbMock = {
  id: '123456',
  email: 'some@user.com',
  password: 'password_hash',
  user_info: userInfoFromDbMock,
  refresh_token: refreshTokenFromDbMock,
} as User;
