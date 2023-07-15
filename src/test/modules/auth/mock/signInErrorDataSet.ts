import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../../../modules/auth';
import { signinUserInputMock } from './registerUserInputMock';
import { userFromDbMock } from './userFromDbMock';

export const signInErrorDataSet = [
  {
    message: 'user was not found by provided email',
    findUser: null,
    passwordMatch: true,
    error: new HttpException(
      AuthService.errorMessages.noUserForEmail(signinUserInputMock.email),
      HttpStatus.BAD_REQUEST,
    ),
  },
  {
    message: 'passwords do not match',
    findUser: userFromDbMock,
    passwordMatch: false,
    error: new HttpException(AuthService.errorMessages.incorectPassword, HttpStatus.BAD_REQUEST),
  },
];
