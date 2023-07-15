import { UserSignUpDto, UserSignInDto } from '../../../../modules/auth';

export const userSignUpRequestMock: UserSignUpDto = {
  first_name: 'Test',
  last_name: 'User',
  email: 'test@user.com',
  password: '123456',
};

export const userSignInRequestMock: UserSignInDto = {
  email: 'test@user.com',
  password: '123456',
};
