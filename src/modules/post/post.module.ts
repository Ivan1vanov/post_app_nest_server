import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, UserInfo, Image, User, Comments } from '../../entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersService } from '../user/users.service';
import { UserInfoService } from '../user-info/user-info.service';
import { ImageService } from '../image/image.service';
import { PostServiceUtils } from './utils';
import { CommentRopository, PostRepository, UserInfoRepository, UserRepository } from '../../repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Image, Comments, UserInfo])],
  controllers: [PostController],
  providers: [
    PostService,
    CloudinaryService,
    UsersService,
    UserInfoService,
    ImageService,
    PostServiceUtils,
    UserRepository,
    UserInfoRepository,
    PostRepository,
    CommentRopository,
  ],
})
export class PostModule {}
