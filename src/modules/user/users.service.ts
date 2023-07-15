import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User, UserInfo } from '../../entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserInfoService } from '../user-info/user-info.service';
import { UserRepository } from '../../repositories';

@Injectable()
export class UsersService {
  private user: User;

  static errorMessages = {
    noUser: '[findUserById]: user does not exists',
    canNotUpdateAvatar: '[updateAvatar] can not update user avatar',
  };

  constructor(
    private cloudinaryService: CloudinaryService,
    private userInfoService: UserInfoService,
    private userRepository: UserRepository,
  ) {}

  public async updateInfo(userInfo: UserInfo): Promise<UserInfo> {
    return this.userInfoService.updateInfo(userInfo);
  }

  public async updateAvatar(newAvatar: Express.Multer.File): Promise<string> {
    const uploadedImage = await this.cloudinaryService.uploadImage(newAvatar);

    const result = await this.userRepository.updateAvatar(this.user.id, uploadedImage.public_id);

    if (!result.affected) {
      throw new Error(UsersService.errorMessages.canNotUpdateAvatar);
    }

    return uploadedImage.public_id;
  }

  public findUserById = (id: string): Promise<User> => {
    const user = this.userRepository.getById(id);

    if (!user) {
      throw new HttpException(UsersService.errorMessages.noUser, HttpStatus.BAD_REQUEST);
    }

    return user;
  };
}
