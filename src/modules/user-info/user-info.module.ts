import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from '../../entity';
import { UserInfoRepository } from '../../repositories';

@Module({
  controllers: [],
  providers: [UserInfoService, UserInfoRepository],
  imports: [TypeOrmModule.forFeature([UserInfo])],
})
export class UserInfoModule {}
