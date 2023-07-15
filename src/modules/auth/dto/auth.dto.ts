import { IsEmail, MinLength } from 'class-validator';

export class UserSignUpDto {
  readonly first_name: string;
  readonly last_name: string;

  @IsEmail()
  readonly email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  readonly password: string;
}

export class UserSignInDto {
  @IsEmail()
  readonly email: string;
  readonly password: string;
}
