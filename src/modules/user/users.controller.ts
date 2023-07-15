import { Body, Controller, Post, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UserInfo } from '../../entity';
import { userRoutes } from './constants';
import { UsersService } from './users.service';

@Controller(userRoutes.mainRoute)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(userRoutes.post.addInfo)
  async addInfo(@Body() dto: UserInfo): Promise<UserInfo> {
    return this.usersService.updateInfo(dto);
  }

  @Put(userRoutes.put.avatar)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.updateAvatar(file);
  }
}
