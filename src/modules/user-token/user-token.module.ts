import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Token } from '../../entity';
import { TokenRepository } from '../../repositories';

@Module({
  controllers: [],
  providers: [UserTokenService, TokenRepository],
  imports: [TypeOrmModule.forFeature([Token, User])],
})
export class UserTokenModule {}
