import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { AuthUserResponse, UserSignInDto, UserSignUpDto } from './dto';
import { AuthServiceUtils } from './utils';
import { UserInfoService } from '../user-info/user-info.service';
import { UserTokenService } from '../user-token/user-token.service';
import { UserRepository } from '../../repositories';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userTokenService: UserTokenService,
    private userInfoService: UserInfoService,
    private authServiceUtils: AuthServiceUtils,
  ) {}

  static errorMessages = {
    noUserForEmail: (email: string) => `User with email ${email} does not exist`,
    incorectPassword: 'Incorect password or email address',
    userAlreadyExists: 'User with this email already exists',
  };

  public async signUpUser(userData: UserSignUpDto): Promise<AuthUserResponse> {
    const { first_name, last_name, ...mainUserData } = userData;
    // todo: add validation of existing user by email

    const candidate = await this.userRepository.getByEmail(mainUserData.email);

    if (candidate) {
      throw new HttpException(AuthService.errorMessages.userAlreadyExists, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(userData.password, 5);

    const newUser = await this.userRepository.saveEntity({ ...mainUserData, password: hashedPassword });

    const tokens = await this.authServiceUtils.generateTokensForUser(newUser);

    await this.userInfoService.createInfo({ first_name: first_name, last_name: last_name, user: newUser.id });
    await this.userTokenService.createToken(tokens.refreshToken, newUser.id);
    return {
      user: newUser,
      tokens,
    };
  }

  public async signInUser(userData: UserSignInDto) {
    const user = await this.userRepository.getByEmail(userData.email);

    if (!user) {
      throw new HttpException(AuthService.errorMessages.noUserForEmail(userData.email), HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatch = await compare(userData.password, user.password);

    if (!isPasswordMatch) {
      throw new HttpException(AuthService.errorMessages.incorectPassword, HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.authServiceUtils.generateTokensForUser(user);

    await this.userTokenService.updateUserToken(tokens.refreshToken, user);

    return {
      user: user,
      tokens,
    };
  }

  public async refreshToken(refreshToken: string) {
    const { payload } = await this.authServiceUtils.verifyToken(refreshToken);

    const user = await this.userRepository.getById(payload.id);

    const tokens = await this.authServiceUtils.generateTokensForUser(user);

    await this.userTokenService.updateRefreshToken(refreshToken, tokens.refreshToken);

    return tokens;
  }
}
