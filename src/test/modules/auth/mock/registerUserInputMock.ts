import { UserSignUpDto, UserSignInDto } from '../../../../modules/auth';

export const registerUserInputMock: UserSignUpDto = {
  first_name: 'New',
  last_name: 'User',
  email: 'new@user.com',
  password: '12345',
};

export const signinUserInputMock: UserSignInDto = {
  email: 'new@user.com',
  password: '12345',
};
