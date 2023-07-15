import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserInfo } from '../../entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserInfoService } from '../user-info/user-info.service';
import { UserRepository } from '../../repositories';
import { UserInfoRepository } from '../../repositories/UserInfoRepository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  controllers: [UsersController],
  providers: [UsersService, CloudinaryService, UserRepository, UserInfoRepository, UserInfoService],
})
export class UsersModule {}
