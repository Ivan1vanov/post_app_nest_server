import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserInfo, User, Token } from '../../entity';
import { AuthServiceUtils } from './utils/AuthService.utils';
import { UserInfoService } from '../user-info/user-info.service';
import { UserTokenService } from '../user-token/user-token.service';
import { TokenRepository, UserInfoRepository, UserRepository } from '../../repositories';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([User, UserInfo, Token])],
  providers: [
    AuthService,
    AuthServiceUtils,
    UserInfoService,
    UserTokenService,
    UserRepository,
    TokenRepository,
    UserInfoRepository,
  ],
})
export class AuthModule {}
